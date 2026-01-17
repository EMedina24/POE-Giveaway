"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Entry } from "@/lib/types/database";

export function useEntries(giveawayId?: string) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Fetch all entries for a giveaway
  const fetchEntries = useCallback(async () => {
    if (!giveawayId) return;

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("entries")
      .select("*")
      .eq("giveaway_id", giveawayId)
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setEntries(data || []);
    }

    setLoading(false);
  }, [giveawayId, supabase]);

  // Add a new entry (participant joins giveaway)
  const addEntry = async (
    participantName: string,
    redditName?: string,
    redditProfileLink?: string
  ): Promise<Entry | null> => {
    if (!giveawayId) {
      setError("No giveaway ID provided");
      return null;
    }

    setLoading(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("entries")
      .insert({
        giveaway_id: giveawayId,
        participant_name: participantName,
        reddit_name: redditName || null,
        reddit_profile_link: redditProfileLink || null,
      })
      .select()
      .single();

    if (insertError) {
      // Handle duplicate entry error
      if (insertError.code === "23505") {
        setError("You have already entered this giveaway");
      } else {
        setError(insertError.message);
      }
      setLoading(false);
      return null;
    }

    setEntries((prev) => [data, ...prev]);
    setLoading(false);
    return data;
  };

  // Remove an entry
  const removeEntry = async (entryId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const { error: deleteError } = await supabase
      .from("entries")
      .delete()
      .eq("id", entryId);

    if (deleteError) {
      setError(deleteError.message);
      setLoading(false);
      return false;
    }

    setEntries((prev) => prev.filter((e) => e.id !== entryId));
    setLoading(false);
    return true;
  };

  // Subscribe to real-time entry updates
  const subscribeToEntries = useCallback(() => {
    if (!giveawayId) return;

    const channel = supabase
      .channel(`entries:${giveawayId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "entries",
          filter: `giveaway_id=eq.${giveawayId}`,
        },
        (payload) => {
          setEntries((prev) => [payload.new as Entry, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "entries",
          filter: `giveaway_id=eq.${giveawayId}`,
        },
        (payload) => {
          setEntries((prev) =>
            prev.filter((e) => e.id !== (payload.old as Entry).id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [giveawayId, supabase]);

  useEffect(() => {
    if (giveawayId) {
      fetchEntries();
    }
  }, [giveawayId, fetchEntries]);

  return {
    entries,
    loading,
    error,
    fetchEntries,
    addEntry,
    removeEntry,
    subscribeToEntries,
    entryCount: entries.length,
  };
}
