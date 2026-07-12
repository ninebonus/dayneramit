import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { documentSchema, docTypeEnum, type DocType } from "./documents.schema";
import { z } from "zod";

export const listDocuments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getDocument = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("documents")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("not found");
    return row;
  });

export const nextDocumentNumber = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { type: DocType }) =>
    z.object({ type: docTypeEnum }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { data: num, error } = await context.supabase.rpc(
      "next_document_number",
      { _type: data.type },
    );
    if (error) throw new Error(error.message);
    return num as string;
  });

export const saveDocument = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => documentSchema.parse(d))
  .handler(async ({ data, context }) => {
    const payload = {
      doc_number: data.doc_number,
      type: data.type,
      status: data.status,
      issue_date: data.issue_date,
      due_date: data.due_date || null,
      customer: data.customer,
      items: data.items,
      subtotal: data.subtotal,
      discount: data.discount,
      vat_enabled: data.vat_enabled,
      vat_rate: data.vat_rate,
      vat_amount: data.vat_amount,
      wht_enabled: data.wht_enabled,
      wht_rate: data.wht_rate,
      wht_amount: data.wht_amount,
      total: data.total,
      note: data.note || null,
      payment_terms: data.payment_terms || null,
      created_by: context.userId,
    };
    if (data.id) {
      const { data: row, error } = await context.supabase
        .from("documents")
        .update(payload)
        .eq("id", data.id)
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      return row;
    }
    const { data: row, error } = await context.supabase
      .from("documents")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteDocument = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("documents")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
