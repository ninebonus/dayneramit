import { useEffect, useMemo } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  computeTotals,
  docStatusEnum,
  docStatusLabels,
  docTypeEnum,
  docTypeLabels,
  documentSchema,
  formatTHB,
  type DocumentInput,
} from "@/lib/documents.schema";
import { Trash2, Plus } from "lucide-react";

interface Props {
  defaultValues: DocumentInput;
  onSubmit: (data: DocumentInput) => void | Promise<unknown>;
  submitting?: boolean;
  submitLabel?: string;
}

export function DocumentForm({
  defaultValues,
  onSubmit,
  submitting,
  submitLabel = "บันทึก",
}: Props) {
  const { register, control, handleSubmit, watch, setValue } =
    useForm<DocumentInput>({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(documentSchema) as any,
      defaultValues: defaultValues as DocumentInput,
    });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const watched = watch();
  const totals = useMemo(
    () =>
      computeTotals({
        items: watched.items ?? [],
        discount: Number(watched.discount) || 0,
        vat_enabled: watched.vat_enabled,
        vat_rate: Number(watched.vat_rate) || 0,
        wht_enabled: watched.wht_enabled,
        wht_rate: Number(watched.wht_rate) || 0,
      }),
    [watched],
  );

  useEffect(() => {
    setValue("subtotal", totals.subtotal);
    setValue("vat_amount", totals.vat_amount);
    setValue("wht_amount", totals.wht_amount);
    setValue("total", totals.total);
  }, [totals, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 lg:grid-cols-3"
    >
      <div className="lg:col-span-2 space-y-6">
        <Card title="ข้อมูลเอกสาร">
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="ประเภท">
              <select
                {...register("type")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                {docTypeEnum.options.map((t) => (
                  <option key={t} value={t}>
                    {docTypeLabels[t]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="เลขที่เอกสาร">
              <input
                {...register("doc_number")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="สถานะ">
              <select
                {...register("status")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                {docStatusEnum.options.map((s) => (
                  <option key={s} value={s}>
                    {docStatusLabels[s]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="วันที่ออก">
              <input
                type="date"
                {...register("issue_date")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="ครบกำหนด / ยืนราคาถึง">
              <input
                type="date"
                {...register("due_date")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
          </div>
        </Card>

        <Card title="ข้อมูลลูกค้า">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="ชื่อลูกค้า">
              <input
                {...register("customer.name")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="เบอร์โทร">
              <input
                {...register("customer.phone")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="เลขผู้เสียภาษี">
              <input
                {...register("customer.taxId")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="อีเมล">
              <input
                {...register("customer.email")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="ที่อยู่">
                <textarea
                  {...register("customer.address")}
                  rows={2}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </Field>
            </div>
          </div>
        </Card>

        <Card
          title="รายการ"
          action={
            <button
              type="button"
              onClick={() =>
                append({
                  description: "",
                  qty: 1,
                  unit: "งาน",
                  unitPrice: 0,
                  discount: 0,
                })
              }
              className="flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> เพิ่มแถว
            </button>
          }
        >
          <div className="space-y-2">
            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">
                ยังไม่มีรายการ กด "เพิ่มแถว" เพื่อเริ่มต้น
              </p>
            )}
            {fields.map((f, i) => (
              <div
                key={f.id}
                className="grid grid-cols-12 gap-2 rounded-lg border border-border p-2 bg-background/50"
              >
                <textarea
                  placeholder="รายละเอียด"
                  {...register(`items.${i}.description`)}
                  rows={1}
                  className="col-span-12 md:col-span-5 rounded border border-border bg-background px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="จำนวน"
                  {...register(`items.${i}.qty`, { valueAsNumber: true })}
                  className="col-span-3 md:col-span-1 rounded border border-border bg-background px-2 py-1 text-sm"
                />
                <input
                  placeholder="หน่วย"
                  {...register(`items.${i}.unit`)}
                  className="col-span-3 md:col-span-1 rounded border border-border bg-background px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="ราคา/หน่วย"
                  {...register(`items.${i}.unitPrice`, { valueAsNumber: true })}
                  className="col-span-3 md:col-span-2 rounded border border-border bg-background px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="ส่วนลด"
                  {...register(`items.${i}.discount`, { valueAsNumber: true })}
                  className="col-span-2 md:col-span-2 rounded border border-border bg-background px-2 py-1 text-sm"
                />
                <div className="col-span-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="text-destructive hover:opacity-75"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="หมายเหตุและเงื่อนไข">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="หมายเหตุ">
              <textarea
                {...register("note")}
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="เงื่อนไขการชำระเงิน">
              <textarea
                {...register("payment_terms")}
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                placeholder="เช่น มัดจำ 50% ที่เหลือหลังจบงาน / โอน PromptPay 092-436-7468"
              />
            </Field>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card title="ภาษีและส่วนลด">
          <div className="space-y-3">
            <Field label="ส่วนลดท้ายบิล (บาท)">
              <input
                type="number"
                step="0.01"
                {...register("discount", { valueAsNumber: true })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <Controller
                control={control}
                name="vat_enabled"
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              รวม VAT 7%
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Controller
                control={control}
                name="wht_enabled"
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              หัก ณ ที่จ่าย 3%
            </label>
          </div>
        </Card>

        <Card title="สรุปยอด">
          <div className="space-y-1 text-sm">
            <Row label="ราคาก่อนภาษี" value={formatTHB(totals.subtotal)} />
            {watched.vat_enabled && (
              <Row label="VAT" value={formatTHB(totals.vat_amount)} />
            )}
            {watched.wht_enabled && (
              <Row
                label="หัก ณ ที่จ่าย"
                value={`- ${formatTHB(totals.wht_amount)}`}
              />
            )}
            <div className="mt-2 pt-2 border-t border-border flex justify-between font-bold text-brand">
              <span>ยอดสุทธิ</span>
              <span>{formatTHB(totals.total)}</span>
            </div>
          </div>
        </Card>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "กำลังบันทึก..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Card({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
