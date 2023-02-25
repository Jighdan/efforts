export interface Database {
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Tables: {
      efforts: {
        Insert: {
          color: string;
          title: string;
          user_id: string;
        };
        Row: {
          color: string;
          created_at: string | null;
          id: number;
          title: string;
          user_id: string;
        };
        Update: {
          color?: string;
          title?: string;
        };
      };
      efforts_entries: {
        Insert: {
          description: string;
          date?: string;
          effort_id?: number;
        };
        Row: {
          created_at: string | null;
          date: string;
          description: string;
          effort_id: number;
          id: number;
        };
        Update: {
          date?: string;
          description?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
}
