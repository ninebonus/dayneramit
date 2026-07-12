import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getDocument } from "@/lib/documents.functions";
import { DocumentTemplate } from "@/components/documents/DocumentTemplate";
import type { DocumentInput } from "@/lib/documents.schema";
import { Printer, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/documents/$id/preview")({
  head: () => ({
    meta: [
      { title: "พรีวิวเอกสาร — Day Neramit" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const { id } = Route.useParams();
  const fetchDoc = useServerFn(getDocument);
  const { data, isLoading } = useQuery({
    queryKey: ["documents", id],
    queryFn: () => fetchDoc({ data: { id } }),
  });

  if (isLoading || !data)
    return (
      <p className="text-center py-16 text-muted-foreground">กำลังโหลด...</p>
    );

  const doc: DocumentInput = {
    id: data.id,
    doc_number: data.doc_number,
    type: data.type,
    status: data.status,
    issue_date: data.issue_date,
    due_date: data.due_date ?? "",
    customer: {
      name: "",
      address: "",
      taxId: "",
      phone: "",
      email: "",
      ...(data.customer as object),
    },
    items: (data.items as never[]) ?? [],
    subtotal: Number(data.subtotal),
    discount: Number(data.discount),
    vat_enabled: data.vat_enabled,
    vat_rate: Number(data.vat_rate),
    vat_amount: Number(data.vat_amount),
    wht_enabled: data.wht_enabled,
    wht_rate: Number(data.wht_rate),
    wht_amount: Number(data.wht_amount),
    total: Number(data.total),
    note: data.note ?? "",
    payment_terms: data.payment_terms ?? "",
  };

  return (
    <div className="min-h-screen bg-slate-900/90">
      <div className="print:hidden sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            to="/documents/$id"
            params={{ id }}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" /> กลับไปแก้ไข
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90"
          >
            <Printer className="h-4 w-4" /> พิมพ์ / บันทึก PDF
          </button>
        </div>
      </div>
      <div className="py-8 print:py-0">
        <DocumentTemplate doc={doc} />
      </div>
    </div>
  );
}
