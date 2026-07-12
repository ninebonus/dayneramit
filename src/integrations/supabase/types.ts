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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      document_counters: {
        Row: {
          seq: number
          type: Database["public"]["Enums"]["doc_type"]
          user_id: string
          year: number
        }
        Insert: {
          seq?: number
          type: Database["public"]["Enums"]["doc_type"]
          user_id: string
          year: number
        }
        Update: {
          seq?: number
          type?: Database["public"]["Enums"]["doc_type"]
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          created_by: string
          customer: Json
          discount: number
          doc_number: string
          due_date: string | null
          id: string
          issue_date: string
          items: Json
          note: string | null
          payment_terms: string | null
          status: Database["public"]["Enums"]["doc_status"]
          subtotal: number
          total: number
          type: Database["public"]["Enums"]["doc_type"]
          updated_at: string
          vat_amount: number
          vat_enabled: boolean
          vat_rate: number
          wht_amount: number
          wht_enabled: boolean
          wht_rate: number
        }
        Insert: {
          created_at?: string
          created_by: string
          customer?: Json
          discount?: number
          doc_number: string
          due_date?: string | null
          id?: string
          issue_date?: string
          items?: Json
          note?: string | null
          payment_terms?: string | null
          status?: Database["public"]["Enums"]["doc_status"]
          subtotal?: number
          total?: number
          type: Database["public"]["Enums"]["doc_type"]
          updated_at?: string
          vat_amount?: number
          vat_enabled?: boolean
          vat_rate?: number
          wht_amount?: number
          wht_enabled?: boolean
          wht_rate?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          customer?: Json
          discount?: number
          doc_number?: string
          due_date?: string | null
          id?: string
          issue_date?: string
          items?: Json
          note?: string | null
          payment_terms?: string | null
          status?: Database["public"]["Enums"]["doc_status"]
          subtotal?: number
          total?: number
          type?: Database["public"]["Enums"]["doc_type"]
          updated_at?: string
          vat_amount?: number
          vat_enabled?: boolean
          vat_rate?: number
          wht_amount?: number
          wht_enabled?: boolean
          wht_rate?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      next_document_number: {
        Args: { _type: Database["public"]["Enums"]["doc_type"] }
        Returns: string
      }
    }
    Enums: {
      doc_status: "draft" | "sent" | "approved" | "paid" | "cancelled"
      doc_type:
        | "quotation"
        | "invoice"
        | "receipt"
        | "tax_invoice"
        | "billing_note"
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
    Enums: {
      doc_status: ["draft", "sent", "approved", "paid", "cancelled"],
      doc_type: [
        "quotation",
        "invoice",
        "receipt",
        "tax_invoice",
        "billing_note",
      ],
    },
  },
} as const
