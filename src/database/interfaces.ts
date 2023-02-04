export interface Database {
  public: {
    Tables: {
      efforts: {
        Row: {
          created_at: string | null
          id: number
          title: string
        }
        Insert: {
          title: string
        }
        Update: {
          title?: string
        }
      }
      efforts_entries: {
        Row: {
          created_at: string | null
          date: string
          description: string
          effort_id: number
          id: number
        }
        Insert: {
          date: string
          description: string
          effort_id: number
        }
        Update: {
          date?: string
          description?: string
          effort_id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
};
