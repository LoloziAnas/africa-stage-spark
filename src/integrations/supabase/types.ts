export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          category: string | null
          cover_image_url: string | null
          created_at: string
          creator_id: string | null
          id: number
          is_free: boolean | null
          max_attendees: number | null
          status: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          creator_id?: string | null
          id?: number
          is_free?: boolean | null
          max_attendees?: number | null
          status?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          creator_id?: string | null
          id?: number
          is_free?: boolean | null
          max_attendees?: number | null
          status?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Event_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          metadata: Json | null
          payment_method: string
          payment_provider: string
          provider_payment_id: string | null
          status: string | null
          ticket_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          payment_method: string
          payment_provider: string
          provider_payment_id?: string | null
          status?: string | null
          ticket_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string
          payment_provider?: string
          provider_payment_id?: string | null
          status?: string | null
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          account_details: Json | null
          amount: number
          created_at: string | null
          creator_id: string | null
          currency: string | null
          id: string
          payout_method: string | null
          processed_at: string | null
          status: string | null
        }
        Insert: {
          account_details?: Json | null
          amount: number
          created_at?: string | null
          creator_id?: string | null
          currency?: string | null
          id?: string
          payout_method?: string | null
          processed_at?: string | null
          status?: string | null
        }
        Update: {
          account_details?: Json | null
          amount?: number
          created_at?: string | null
          creator_id?: string | null
          currency?: string | null
          id?: string
          payout_method?: string | null
          processed_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          creator_verified: boolean | null
          full_name: string | null
          id: string
          phone_number: string | null
          preferred_payment_method: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          creator_verified?: boolean | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          preferred_payment_method?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          creator_verified?: boolean | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          preferred_payment_method?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      ticket_types: {
        Row: {
          created_at: string | null
          description: string | null
          event_id: number | null
          id: string
          is_active: boolean | null
          name: string
          price: number | null
          quantity_available: number | null
          quantity_sold: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_id?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          price?: number | null
          quantity_available?: number | null
          quantity_sold?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_id?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number | null
          quantity_available?: number | null
          quantity_sold?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_types_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          buyer_id: string | null
          checked_in_at: string | null
          created_at: string | null
          event_id: number | null
          id: string
          payment_id: string | null
          purchase_amount: number | null
          qr_code: string | null
          status: string | null
          ticket_type_id: string | null
        }
        Insert: {
          buyer_id?: string | null
          checked_in_at?: string | null
          created_at?: string | null
          event_id?: number | null
          id?: string
          payment_id?: string | null
          purchase_amount?: number | null
          qr_code?: string | null
          status?: string | null
          ticket_type_id?: string | null
        }
        Update: {
          buyer_id?: string | null
          checked_in_at?: string | null
          created_at?: string | null
          event_id?: number | null
          id?: string
          payment_id?: string | null
          purchase_amount?: number | null
          qr_code?: string | null
          status?: string | null
          ticket_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      tips: {
        Row: {
          amount: number
          created_at: string | null
          creator_id: string | null
          currency: string | null
          event_id: number | null
          id: string
          message: string | null
          payment_id: string | null
          status: string | null
          tipper_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          creator_id?: string | null
          currency?: string | null
          event_id?: number | null
          id?: string
          message?: string | null
          payment_id?: string | null
          status?: string | null
          tipper_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          creator_id?: string | null
          currency?: string | null
          event_id?: number | null
          id?: string
          message?: string | null
          payment_id?: string | null
          status?: string | null
          tipper_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tips_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tips_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tips_tipper_id_fkey"
            columns: ["tipper_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
