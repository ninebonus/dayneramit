import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDocument, saveDocument } from "@/lib/documents.functions";
import type { DocumentInput } from "@/lib/documents.schema";
import { DocumentForm } from "@/components/documents/DocumentForm";
import { toast } from "sonner";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/_authenticated/documents/$id")({
  head: () => ({ meta: [{ title: "แก้ไขเอกสาร — Day Neramit" }, { name: "robots", content: "noindex" }] }),
  component: EditDocumentPage,
});

function EditDocumentPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchDoc = useServerFn(getDocument);
  const save = useServerFn(saveDocument);

  const { data, isLoading } = useQuery({
    queryKey: ["documents", id],
    queryFn: () => fetchDoc({ data: { id } }),
  });

  const saveMut = useMutation({
    mutationFn: (d: DocumentInput) => save({ data: d }),
    onSuccess: () => {
      toast.success("บันทึกแล้ว");
      qc.invalidateQueries({ queryKey: ["documents"] });
      qc.invalidateQueries({ queryKey: ["documents", id] });
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : "บันทึกไม่สำเร็จ"),
  });

  if (isLoading || !data) {
    return (
      <p className="text-center py-16 text-muted-foreground">กำลังโหลด...</p>
    );
  }

  const defaults: DocumentInput = {
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/documents"
              className="text-sm text-muted-foreground hover:text-brand"
            >
              ← กลับ
            </Link>
            <span className="text-muted-foreground">|</span>
            <div>
              <div className="text-sm font-bold">{data.doc_number}</div>
              <div className="text-xs text-muted-foreground">แก้ไขเอกสาร</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                navigate({
                  to: "/documents/$id/preview",
                  params: { id: data.id },
                })
              }
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-accent"
            >
              <Eye className="h-3.5 w-3.5" /> พรีวิว / พิมพ์
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-6">
        <DocumentForm
          defaultValues={defaults}
          onSubmit={(d) => saveMut.mutateAsync(d)}
          submitting={saveMut.isPending}
          submitLabel="บันทึกเอกสาร"
        />
      </main>
    </div>
  );
}
