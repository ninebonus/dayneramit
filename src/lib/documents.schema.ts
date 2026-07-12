import { z } from "zod";

export const docTypeEnum = z.enum([
  "quotation",
  "invoice",
  "receipt",
  "tax_invoice",
  "billing_note",
]);
export type DocType = z.infer<typeof docTypeEnum>;

export const docStatusEnum = z.enum([
  "draft",
  "sent",
  "approved",
  "paid",
  "cancelled",
]);
export type DocStatus = z.infer<typeof docStatusEnum>;

export const docTypeLabels: Record<DocType, string> = {
  quotation: "ใบเสนอราคา",
  invoice: "ใบแจ้งหนี้",
  receipt: "ใบเสร็จรับเงิน",
  tax_invoice: "ใบกำกับภาษี",
  billing_note: "ใบวางบิล",
};

export const docStatusLabels: Record<DocStatus, string> = {
  draft: "ร่าง",
  sent: "ส่งแล้ว",
  approved: "อนุมัติ",
  paid: "ชำระแล้ว",
  cancelled: "ยกเลิก",
};

export const customerSchema = z.object({
  name: z.string().default(""),
  address: z.string().default(""),
  taxId: z.string().default(""),
  phone: z.string().default(""),
  email: z.string().default(""),
});
export type Customer = z.infer<typeof customerSchema>;

export const itemSchema = z.object({
  description: z.string().default(""),
  qty: z.number().default(1),
  unit: z.string().default(""),
  unitPrice: z.number().default(0),
  discount: z.number().default(0),
});
export type DocItem = z.infer<typeof itemSchema>;

export const documentSchema = z.object({
  id: z.string().optional(),
  doc_number: z.string(),
  type: docTypeEnum,
  status: docStatusEnum.default("draft"),
  issue_date: z.string(),
  due_date: z.string().nullable().optional(),
  customer: customerSchema,
  items: z.array(itemSchema).default([]),
  subtotal: z.number().default(0),
  discount: z.number().default(0),
  vat_enabled: z.boolean().default(true),
  vat_rate: z.number().default(0.07),
  vat_amount: z.number().default(0),
  wht_enabled: z.boolean().default(false),
  wht_rate: z.number().default(0.03),
  wht_amount: z.number().default(0),
  total: z.number().default(0),
  note: z.string().nullable().optional(),
  payment_terms: z.string().nullable().optional(),
});
export type DocumentInput = z.infer<typeof documentSchema>;

export function computeTotals(input: {
  items: DocItem[];
  discount: number;
  vat_enabled: boolean;
  vat_rate: number;
  wht_enabled: boolean;
  wht_rate: number;
}) {
  const lineSum = input.items.reduce(
    (s, it) => s + Math.max(0, it.qty * it.unitPrice - (it.discount || 0)),
    0,
  );
  const subtotal = Math.max(0, lineSum - (input.discount || 0));
  const vat_amount = input.vat_enabled ? subtotal * input.vat_rate : 0;
  const wht_amount = input.wht_enabled ? subtotal * input.wht_rate : 0;
  const total = subtotal + vat_amount - wht_amount;
  return {
    subtotal: round2(subtotal),
    vat_amount: round2(vat_amount),
    wht_amount: round2(wht_amount),
    total: round2(total),
  };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function formatTHB(n: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2,
  }).format(n || 0);
}

export function formatThaiDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const day = d.getDate();
  const months = [
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
    "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
  ];
  const month = months[d.getMonth()];
  const year = d.getFullYear() + 543;
  return `${day} ${month} ${year}`;
}
