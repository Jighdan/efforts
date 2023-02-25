export interface Database {
  public: {
    Tables: {
      efforts: {
        Row: {
          id: number;
          color: string;
          title: string;
          user_id: string;
          created_at: string | null;
        };
        Insert: {
          color: string;
          title: string;
          user_id: string;
        };
        Update: {
          color?: string;
          title?: string;
        };
      };
      efforts_entries: {
        Row: {
          created_at: string | null;
          date: string;
          description: string;
          effort_id: number;
          id: number;
        };
        Insert: {
          date?: string;
          description: string;
          effort_id?: number;
        };
        Update: {
          date?: string;
          description?: string;
        };
      };
    };
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  };
}