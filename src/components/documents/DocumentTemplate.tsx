import type { DocumentInput } from "@/lib/documents.schema";
import {
  docTypeLabels,
  formatTHB,
  formatThaiDate,
} from "@/lib/documents.schema";

interface Props {
  doc: DocumentInput;
}

const COMPANY = {
  name: "Day Neramit",
  tagline: "ช่างมืออาชีพครบวงจร — แอร์ · CCTV · ไฟฟ้า · ประปา · รีโนเวท",
  address: "นนทบุรี · บางใหญ่ · บางบัวทอง · ปากเกร็ด",
  phone: "092-436-7468",
  line: "@xevilteam",
  taxId: "-",
};

export function DocumentTemplate({ doc }: Props) {
  const items = doc.items || [];
  return (
    <div className="doc-page bg-white text-slate-900 mx-auto shadow-2xl print:shadow-none">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="h-24 relative"
          style={{
            background:
              "linear-gradient(90deg, #7c3aed 0%, #a855f7 40%, #f59e0b 100%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-between px-10 text-white">
            <div>
              <div className="text-2xl font-extrabold tracking-tight">
                {COMPANY.name}
              </div>
              <div className="text-xs opacity-90">{COMPANY.tagline}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold uppercase tracking-widest">
                {docTypeLabels[doc.type]}
              </div>
              <div className="text-[11px] opacity-90 mt-1">
                {doc.doc_number}
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300" />
      </div>

      {/* Info blocks */}
      <div className="grid grid-cols-2 gap-6 px-10 pt-6">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="text-[10px] uppercase text-slate-500 tracking-widest">
            ผู้ออกเอกสาร
          </div>
          <div className="mt-1 font-bold text-slate-900">{COMPANY.name}</div>
          <div className="text-xs text-slate-600 leading-relaxed mt-1">
            {COMPANY.address}
            <br />
            โทร {COMPANY.phone} · LINE {COMPANY.line}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="text-[10px] uppercase text-slate-500 tracking-widest">
            ลูกค้า
          </div>
          <div className="mt-1 font-bold text-slate-900">
            {doc.customer.name || "—"}
          </div>
          <div className="text-xs text-slate-600 leading-relaxed mt-1 whitespace-pre-line">
            {doc.customer.address || "—"}
            {doc.customer.phone && (
              <>
                <br />
                โทร {doc.customer.phone}
              </>
            )}
            {doc.customer.taxId && (
              <>
                <br />
                เลขผู้เสียภาษี {doc.customer.taxId}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 px-10 pt-4 text-xs">
        <div>
          <div className="text-slate-500">วันที่ออก</div>
          <div className="font-semibold">{formatThaiDate(doc.issue_date)}</div>
        </div>
        {doc.due_date && (
          <div>
            <div className="text-slate-500">
              {doc.type === "quotation" ? "ยืนราคาถึง" : "ครบกำหนด"}
            </div>
            <div className="font-semibold">{formatThaiDate(doc.due_date)}</div>
          </div>
        )}
        <div>
          <div className="text-slate-500">เลขที่</div>
          <div className="font-semibold">{doc.doc_number}</div>
        </div>
      </div>

      {/* Items table */}
      <div className="px-10 pt-5">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr
              style={{
                background: "linear-gradient(90deg, #7c3aed, #a855f7)",
                color: "white",
              }}
            >
              <th className="py-2 px-2 text-left w-10">#</th>
              <th className="py-2 px-2 text-left">รายการ</th>
              <th className="py-2 px-2 text-right w-16">จำนวน</th>
              <th className="py-2 px-2 text-center w-16">หน่วย</th>
              <th className="py-2 px-2 text-right w-24">ราคา/หน่วย</th>
              <th className="py-2 px-2 text-right w-28">รวม</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center text-slate-400 border-b"
                >
                  ยังไม่มีรายการ
                </td>
              </tr>
            ) : (
              items.map((it, i) => {
                const line = Math.max(
                  0,
                  it.qty * it.unitPrice - (it.discount || 0),
                );
                return (
                  <tr key={i} className="border-b border-slate-200">
                    <td className="py-2 px-2">{i + 1}</td>
                    <td className="py-2 px-2 whitespace-pre-line">
                      {it.description}
                    </td>
                    <td className="py-2 px-2 text-right">{it.qty}</td>
                    <td className="py-2 px-2 text-center">{it.unit}</td>
                    <td className="py-2 px-2 text-right">
                      {formatTHB(it.unitPrice)}
                    </td>
                    <td className="py-2 px-2 text-right font-medium">
                      {formatTHB(line)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-6 px-10 pt-5">
        <div className="text-xs text-slate-600 leading-relaxed">
          {doc.note && (
            <>
              <div className="font-semibold text-slate-800 mb-1">หมายเหตุ</div>
              <div className="whitespace-pre-line">{doc.note}</div>
            </>
          )}
          {doc.payment_terms && (
            <>
              <div className="font-semibold text-slate-800 mt-3 mb-1">
                เงื่อนไขการชำระเงิน
              </div>
              <div className="whitespace-pre-line">{doc.payment_terms}</div>
            </>
          )}
        </div>
        <div className="rounded-lg border border-slate-200 p-4 text-sm">
          <Row label="ยอดรวม" value={formatTHB(doc.subtotal + doc.discount)} />
          {doc.discount > 0 && (
            <Row label="ส่วนลด" value={`- ${formatTHB(doc.discount)}`} />
          )}
          <Row label="ราคาก่อนภาษี" value={formatTHB(doc.subtotal)} />
          {doc.vat_enabled && (
            <Row
              label={`VAT ${Math.round(doc.vat_rate * 100)}%`}
              value={formatTHB(doc.vat_amount)}
            />
          )}
          {doc.wht_enabled && (
            <Row
              label={`หัก ณ ที่จ่าย ${Math.round(doc.wht_rate * 100)}%`}
              value={`- ${formatTHB(doc.wht_amount)}`}
            />
          )}
          <div className="mt-2 pt-2 border-t border-slate-300 flex justify-between text-base font-bold text-slate-900">
            <span>ยอดสุทธิ</span>
            <span
              style={{
                background: "linear-gradient(90deg,#7c3aed,#f59e0b)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {formatTHB(doc.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-6 px-10 pt-10 pb-8 text-xs">
        <div className="text-center">
          <div className="h-16 border-b border-slate-400" />
          <div className="mt-2 text-slate-600">ผู้รับเอกสาร / ลูกค้า</div>
        </div>
        <div className="text-center">
          <div className="h-16 border-b border-slate-400" />
          <div className="mt-2 text-slate-600">ผู้ออกเอกสาร — {COMPANY.name}</div>
        </div>
      </div>

      {/* Gold footer */}
      <div
        className="h-3"
        style={{
          background:
            "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
        }}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 text-slate-700">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
