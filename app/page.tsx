"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ActiveGiveawayCard from "@/components/active-giveaway-card";
import type { Giveaway } from "@/lib/types/database";

export default function Home() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGiveaways = async () => {
      setLoading(true);
      setError(null);

      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("giveaways")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setGiveaways(data || []);
      }

      setLoading(false);
    };

    fetchGiveaways();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                POE Giveaway
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Create and join Path of Exile currency giveaways
              </p>
            </div>
            <Link
              href="/create-giveaway"
              className="flex-shrink-0 rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Create Giveaway
            </Link>
          </div>
        </div>

        {/* Active Giveaways Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Active Giveaways
          </h2>

          {loading ? (
            <div className="text-center text-zinc-600 dark:text-zinc-400 py-8">
              Loading giveaways...
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : giveaways.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-12 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-center text-zinc-600 dark:text-zinc-400">
                No active giveaways at the moment.
              </p>
              <Link
                href="/create-giveaway"
                className="rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Create the First Giveaway
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {giveaways.map((giveaway) => (
                <ActiveGiveawayCard key={giveaway.id} giveaway={giveaway} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
