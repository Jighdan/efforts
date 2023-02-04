export interface Database {
  public: {
    Tables: {
      efforts: {
        Row: {
          color: string;
          created_at: string | null;
          id: number;
          title: string;
        };
        Insert: {
          color: string;
          title: string;
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
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
