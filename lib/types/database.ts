export type Database = {
  public: {
    Tables: {
      giveaways: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          creator_name: string;
          status: "active" | "closed" | "drawn";
          winner_id: string | null;
          created_at: string;
          ends_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          creator_name: string;
          status?: "active" | "closed" | "drawn";
          winner_id?: string | null;
          created_at?: string;
          ends_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          creator_name?: string;
          status?: "active" | "closed" | "drawn";
          winner_id?: string | null;
          created_at?: string;
          ends_at?: string | null;
        };
      };
      entries: {
        Row: {
          id: string;
          giveaway_id: string;
          participant_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          giveaway_id: string;
          participant_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          giveaway_id?: string;
          participant_name?: string;
          created_at?: string;
        };
      };
    };
  };
};

// Convenience types
export type Giveaway = Database["public"]["Tables"]["giveaways"]["Row"];
export type GiveawayInsert = Database["public"]["Tables"]["giveaways"]["Insert"];
export type GiveawayUpdate = Database["public"]["Tables"]["giveaways"]["Update"];

export type Entry = Database["public"]["Tables"]["entries"]["Row"];
export type EntryInsert = Database["public"]["Tables"]["entries"]["Insert"];
export type EntryUpdate = Database["public"]["Tables"]["entries"]["Update"];
