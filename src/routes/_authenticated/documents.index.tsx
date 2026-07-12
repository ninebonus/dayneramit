import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listDocuments,
  deleteDocument,
  nextDocumentNumber,
  saveDocument,
} from "@/lib/documents.functions";
import {
  docTypeEnum,
  docTypeLabels,
  docStatusLabels,
  formatTHB,
  formatThaiDate,
  type DocType,
} from "@/lib/documents.schema";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, FileText, Trash2, LogOut, Eye, Edit } from "lucide-react";

export const Route = createFileRoute("/_authenticated/documents/")({
  head: () => ({
    meta: [
      { title: "ระบบเอกสาร — Day Neramit" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DocumentsListPage,
});

function DocumentsListPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const list = useServerFn(listDocuments);
  const del = useServerFn(deleteDocument);
  const nextNum = useServerFn(nextDocumentNumber);
  const save = useServerFn(saveDocument);

  const { data, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: () => list(),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
      toast.success("ลบเอกสารแล้ว");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "ลบไม่สำเร็จ"),
  });

  const createMut = useMutation({
    mutationFn: async (type: DocType) => {
      const num = await nextNum({ data: { type } });
      const row = await save({
        data: {
          doc_number: num,
          type,
          status: "draft",
          issue_date: new Date().toISOString().slice(0, 10),
          due_date: null,
          customer: { name: "", address: "", taxId: "", phone: "", email: "" },
          items: [],
          subtotal: 0,
          discount: 0,
          vat_enabled: true,
          vat_rate: 0.07,
          vat_amount: 0,
          wht_enabled: false,
          wht_rate: 0.03,
          wht_amount: 0,
          total: 0,
          note: "",
          payment_terms: "",
        },
      });
      return row;
    },
    onSuccess: (row: { id: string }) => {
      qc.invalidateQueries({ queryKey: ["documents"] });
      navigate({ to: "/documents/$id", params: { id: row.id } });
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : "สร้างเอกสารไม่สำเร็จ"),
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-brand">
              ← หน้าเว็บ
            </Link>
            <span className="text-muted-foreground">|</span>
            <h1 className="text-lg font-bold">ระบบเอกสาร Day Neramit</h1>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" /> ออกจากระบบ
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">เอกสารทั้งหมด</h2>
            <p className="text-sm text-muted-foreground">
              จัดการใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จ ในที่เดียว
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {docTypeEnum.options.map((t) => (
              <button
                key={t}
                disabled={createMut.isPending}
                onClick={() => createMut.mutate(t)}
                className="flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50"
              >
                <Plus className="h-3.5 w-3.5" />
                {docTypeLabels[t]}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="text-center py-16 text-muted-foreground">กำลังโหลด...</p>
        ) : !data || data.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/40" />
            <p className="mt-3 text-muted-foreground">
              ยังไม่มีเอกสาร กดปุ่มด้านบนเพื่อสร้าง
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-background/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">เลขที่</th>
                  <th className="text-left px-4 py-3">ประเภท</th>
                  <th className="text-left px-4 py-3">ลูกค้า</th>
                  <th className="text-left px-4 py-3">วันที่</th>
                  <th className="text-left px-4 py-3">สถานะ</th>
                  <th className="text-right px-4 py-3">ยอดสุทธิ</th>
                  <th className="text-right px-4 py-3">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.id} className="border-t border-border">
                    <td className="px-4 py-3 font-mono text-xs">
                      {d.doc_number}
                    </td>
                    <td className="px-4 py-3">
                      {docTypeLabels[d.type as DocType]}
                    </td>
                    <td className="px-4 py-3">
                      {(d.customer as { name?: string })?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatThaiDate(d.issue_date)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand">
                        {docStatusLabels[d.status as keyof typeof docStatusLabels]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatTHB(Number(d.total))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to="/documents/$id/preview"
                          params={{ id: d.id }}
                          className="text-muted-foreground hover:text-brand"
                          title="พรีวิว"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          to="/documents/$id"
                          params={{ id: d.id }}
                          className="text-muted-foreground hover:text-brand"
                          title="แก้ไข"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm(`ลบเอกสาร ${d.doc_number}?`))
                              delMut.mutate(d.id);
                          }}
                          className="text-muted-foreground hover:text-destructive"
                          title="ลบ"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
