import type { DocumentInput } from "@/lib/documents.schema";
import {
  docTypeLabels,
  formatTHB,
  formatThaiDate,
} from "@/lib/documents.schema";
import logoUrl from "@/assets/dayneramit-logo.png";
import { Phone, Mail, MapPin, User, Building2 } from "lucide-react";

interface Props {
  doc: DocumentInput;
}

const COMPANY = {
  name: "บริษัท เดย์ เนรมิต จำกัด",
  addressLine1: "88/12 หมู่บ้านสุขสันต์ ซอย 5 ถนนรามอินทรา",
  addressLine2: "แขวงท่าแร้ง เขตบางเขน กรุงเทพมหานคร 10230",
  taxId: "0105569008421",
  phone: "092-436-7468",
  line: "0924367468",
  email: "dayneramitt@gmail.com",
  location: "กรุงเทพมหานคร, ประเทศไทย",
  desc1: "บริการซ่อมแซม ติดตั้ง ต่อเติม รีโนเวท",
  desc2: "ระบบไฟฟ้า ประปา และงานก่อสร้าง",
  bankName: "ธนาคารกสิกรไทย",
  bankAcc: "123-8-45678-9",
  bankAccName: "บริษัท เดย์ เนรมิต จำกัด",
};

export function DocumentTemplate({ doc }: Props) {
  const items = doc.items || [];
  return (
    <div className="doc-page bg-white text-slate-900 mx-auto shadow-2xl print:shadow-none">
      {/* Header */}
      <div className="grid grid-cols-2 gap-6 px-10 pt-10">
        <div className="flex gap-4">
          <img
            src={logoUrl}
            alt="Day Neramit"
            className="h-24 w-24 object-contain shrink-0"
          />
          <div className="text-[13px] leading-relaxed">
            <div className="font-bold text-lg text-slate-900">
              {COMPANY.name}
            </div>
            <div className="text-slate-600 mt-1">
              {COMPANY.addressLine1}
              <br />
              {COMPANY.addressLine2}
              <br />
              เลขประจำตัวผู้เสียภาษี {COMPANY.taxId}
            </div>
            <div className="mt-2 space-y-0.5 text-slate-700">
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-amber-600" />
                {COMPANY.phone}
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-amber-600" />
                {COMPANY.email}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-extrabold text-slate-900 leading-tight">
            {docTypeLabels[doc.type]}
          </div>
          <div className="inline-block mt-1 h-1 w-24 bg-amber-500 rounded-full" />
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center justify-end gap-3">
              <span className="text-slate-500">เลขที่เอกสาร :</span>
              <span className="inline-block bg-slate-900 text-amber-400 font-bold px-3 py-1 rounded">
                {doc.doc_number}
              </span>
            </div>
            <div className="flex items-center justify-end gap-3">
              <span className="text-slate-500">วันที่ออกเอกสาร :</span>
              <span className="font-semibold text-slate-800">
                {formatThaiDate(doc.issue_date)}
              </span>
            </div>
            {doc.due_date && (
              <div className="flex items-center justify-end gap-3">
                <span className="text-slate-500">
                  {doc.type === "quotation" ? "ยืนราคาถึง :" : "ครบกำหนด :"}
                </span>
                <span className="font-semibold text-slate-800">
                  {formatThaiDate(doc.due_date)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-5 px-10 pt-8">
        <InfoCard icon={<Building2 className="h-4 w-4" />} title="ข้อมูลบริษัท">
          <div className="font-bold text-slate-900">{COMPANY.name}</div>
          <div className="text-slate-600 mt-1 text-[12px] leading-relaxed">
            {COMPANY.desc1}
            <br />
            {COMPANY.desc2}
          </div>
          <div className="mt-2 space-y-0.5 text-[12px] text-slate-700">
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-amber-600" /> {COMPANY.phone}
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-amber-600" /> {COMPANY.email}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-amber-600" /> {COMPANY.location}
            </div>
          </div>
        </InfoCard>
        <InfoCard icon={<User className="h-4 w-4" />} title="ข้อมูลลูกค้า">
          <table className="text-[12px] w-full">
            <tbody>
              <tr>
                <td className="text-slate-500 pr-3 align-top py-0.5 w-20">
                  ชื่อลูกค้า
                </td>
                <td className="font-semibold text-slate-900">
                  {doc.customer.name || "—"}
                </td>
              </tr>
              <tr>
                <td className="text-slate-500 pr-3 align-top py-0.5">ที่อยู่</td>
                <td className="text-slate-700 whitespace-pre-line">
                  {doc.customer.address || "—"}
                </td>
              </tr>
              {doc.customer.phone && (
                <tr>
                  <td className="text-slate-500 pr-3 align-top py-0.5">
                    เบอร์โทร
                  </td>
                  <td className="text-slate-700">{doc.customer.phone}</td>
                </tr>
              )}
              {doc.customer.taxId && (
                <tr>
                  <td className="text-slate-500 pr-3 align-top py-0.5">
                    เลขผู้เสียภาษี
                  </td>
                  <td className="text-slate-700">{doc.customer.taxId}</td>
                </tr>
              )}
              {doc.customer.email && (
                <tr>
                  <td className="text-slate-500 pr-3 align-top py-0.5">
                    อีเมล
                  </td>
                  <td className="text-slate-700">{doc.customer.email}</td>
                </tr>
              )}
            </tbody>
          </table>
        </InfoCard>
      </div>

      {/* Items table */}
      <div className="px-10 pt-6">
        <table className="w-full text-[12px] border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="py-2.5 px-2 text-center w-10 font-semibold">
                ลำดับ
              </th>
              <th className="py-2.5 px-2 text-left font-semibold">รายการ</th>
              <th className="py-2.5 px-2 text-right w-16 font-semibold">
                จำนวน
              </th>
              <th className="py-2.5 px-2 text-center w-16 font-semibold">
                หน่วย
              </th>
              <th className="py-2.5 px-2 text-right w-24 font-semibold">
                ราคาต่อหน่วย
                <div className="text-[10px] font-normal opacity-80">(บาท)</div>
              </th>
              <th className="py-2.5 px-2 text-right w-28 font-semibold">
                จำนวนเงิน
                <div className="text-[10px] font-normal opacity-80">(บาท)</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-slate-400 border-b border-slate-200"
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
                    <td className="py-3 px-2 text-center align-top">{i + 1}</td>
                    <td className="py-3 px-2 align-top whitespace-pre-line">
                      {it.description}
                    </td>
                    <td className="py-3 px-2 text-right align-top">{it.qty}</td>
                    <td className="py-3 px-2 text-center align-top">
                      {it.unit}
                    </td>
                    <td className="py-3 px-2 text-right align-top">
                      {formatTHB(it.unitPrice).replace("฿", "")}
                    </td>
                    <td className="py-3 px-2 text-right align-top font-medium">
                      {formatTHB(line).replace("฿", "")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Payment + Summary */}
      <div className="grid grid-cols-2 gap-5 px-10 pt-6">
        <div>
          <div className="font-bold text-slate-900 text-sm mb-2">
            ช่องทางการชำระเงิน
          </div>
          <div className="rounded-lg border border-slate-200 p-3 text-[12px]">
            <div className="font-semibold text-slate-800">
              {COMPANY.bankName}
            </div>
            <div className="text-slate-600 mt-1">
              เลขที่บัญชี : {COMPANY.bankAcc}
            </div>
            <div className="text-slate-600">
              ชื่อบัญชี : {COMPANY.bankAccName}
            </div>
          </div>
          {doc.note && (
            <div className="mt-3 text-[12px]">
              <div className="font-bold text-slate-900 mb-1">หมายเหตุ</div>
              <div className="text-slate-600 whitespace-pre-line">
                {doc.note}
              </div>
            </div>
          )}
          {doc.payment_terms && (
            <div className="mt-3 text-[12px]">
              <div className="font-bold text-slate-900 mb-1">
                เงื่อนไขการชำระเงิน
              </div>
              <div className="text-slate-600 whitespace-pre-line">
                {doc.payment_terms}
              </div>
            </div>
          )}
        </div>

        <div className="text-sm">
          <SumRow
            label="รวมก่อนส่วนลด"
            value={formatTHB(doc.subtotal + doc.discount).replace("฿", "")}
          />
          {doc.discount > 0 && (
            <SumRow
              label="ส่วนลด"
              value={`- ${formatTHB(doc.discount).replace("฿", "")}`}
            />
          )}
          <SumRow
            label="รวมก่อนภาษี"
            value={formatTHB(doc.subtotal).replace("฿", "")}
          />
          {doc.vat_enabled && (
            <SumRow
              label={`ภาษีมูลค่าเพิ่ม ${Math.round(doc.vat_rate * 100)}%`}
              value={formatTHB(doc.vat_amount).replace("฿", "")}
            />
          )}
          {doc.wht_enabled && (
            <SumRow
              label={`หัก ณ ที่จ่าย ${Math.round(doc.wht_rate * 100)}%`}
              value={`- ${formatTHB(doc.wht_amount).replace("฿", "")}`}
            />
          )}
          <div className="mt-2 bg-slate-900 text-white px-4 py-3 rounded flex items-center justify-between">
            <span className="font-bold">รวมทั้งสิ้น</span>
            <span className="text-amber-400 font-extrabold text-xl">
              {formatTHB(doc.total).replace("฿", "")}
            </span>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-10 px-10 pt-10 pb-6 text-[12px]">
        <div className="text-center">
          <div className="text-slate-600 mb-8">ผู้รับเงิน / ผู้ออกเอกสาร</div>
          <div className="border-b border-slate-400 mx-6" />
          <div className="mt-2 text-slate-600">( ช่างเดย์ เนรมิต )</div>
        </div>
        <div className="text-center">
          <div className="text-slate-600 mb-8">ผู้ชำระเงิน / ลูกค้า</div>
          <div className="border-b border-slate-400 mx-6" />
          <div className="mt-2 text-slate-600">
            ( {doc.customer.name || "................................"} )
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-slate-900 text-white px-10 py-3 flex items-center justify-between text-[11px] flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-amber-400" />{" "}
          {COMPANY.location}
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 text-amber-400" /> {COMPANY.phone}
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5 text-amber-400" /> {COMPANY.email}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400">LINE</span> {COMPANY.line}
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-200">
        <span className="h-6 w-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center">
          {icon}
        </span>
        <span className="font-bold text-slate-900 text-sm">{title}</span>
      </div>
      {children}
    </div>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-700">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
