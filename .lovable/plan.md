## ระบบออกเอกสาร Day Neramit

พอร์ตดีไซน์ template ทองจากไฟล์ zip ที่อัปโหลด (ai-bos quotation engine) มาเป็นระบบ TanStack Start ในโปรเจกต์นี้ รองรับเอกสารหลายประเภท เก็บบน Lovable Cloud

### ประเภทเอกสารที่รองรับ
- ใบเสนอราคา (Quotation)
- ใบแจ้งหนี้ (Invoice)
- ใบเสร็จรับเงิน (Receipt)
- ใบกำกับภาษี (Tax Invoice)
- ใบวางบิล (Billing Note)

ทุกประเภทใช้ template เดียวกัน (โทน LED ม่วง + gold accent สไตล์ Day Neramit) แค่เปลี่ยนหัวเอกสารและฟิลด์บางส่วน (เช่น VAT, เลขที่อ้างอิง)

### หน้าใหม่
```
/documents                    รายการเอกสารทั้งหมด (filter ตามประเภท/สถานะ)
/documents/new?type=quotation ฟอร์มสร้างเอกสารใหม่
/documents/$id                หน้าแก้ไข
/documents/$id/preview        พรีวิว + ปุ่มพิมพ์/บันทึก PDF (ผ่าน window.print + CSS @page A4)
```

### ฟีเจอร์หลัก
1. **ฟอร์มสร้าง/แก้ไข**
   - ข้อมูลผู้ออก (ล็อกเป็น Day Neramit จาก config)
   - ข้อมูลลูกค้า (ชื่อ/ที่อยู่/เลขผู้เสียภาษี/โทร)
   - เลขที่เอกสาร (auto-generate: `QT-2026-0001` เป็นต้น)
   - วันที่ออก / วันหมดอายุ
   - รายการสินค้า/บริการ (เพิ่ม-ลบแถว, จำนวน × ราคา = ยอดรวม)
   - VAT 7% (toggle), หัก ณ ที่จ่าย, ส่วนลด
   - หมายเหตุ + เงื่อนไขการชำระเงิน + QR PromptPay
2. **พรีวิวแบบพิมพ์จริง (A4)**
   - Header ทอง + โลโก้
   - ตารางรายการ + สรุปยอด (SummaryPanel)
   - บล็อกลายเซ็น + ตราประทับ
   - Footer แถบทอง
3. **บันทึกอัตโนมัติ** ทุก 2 วิลง Cloud
4. **สถานะ**: ร่าง / ส่งแล้ว / อนุมัติ / ชำระแล้ว / ยกเลิก
5. **ทำสำเนา** เอกสารเดิม (duplicate) และ **แปลงประเภท** (เช่น จากใบเสนอราคา → ใบแจ้งหนี้)

### โครง Database (Lovable Cloud)
- `documents` — id, doc_number, type, status, customer (jsonb), issue_date, due_date, items (jsonb), subtotal, vat, discount, wht, total, note, created_by, timestamps
- RLS: user เห็นเฉพาะเอกสารของตัวเอง (`auth.uid() = created_by`)
- `document_counters` — เก็บ running number ต่อประเภท/ปี สำหรับ auto-generate เลข

### Auth
เปิด email/password + Google sign-in (บังคับ login เข้าใช้ระบบเอกสาร ผ่าน `_authenticated` layout)

### รายละเอียดเทคนิค
- ฟอร์ม: `react-hook-form` + `zod` (มีอยู่แล้วในโปรเจกต์)
- state: TanStack Query + `createServerFn` + `requireSupabaseAuth`
- พิมพ์ PDF: CSS `@media print` + `@page { size: A4; margin: 0 }` แล้วเรียก `window.print()` — ผู้ใช้เลือก Save as PDF ในไดอะล็อกเบราว์เซอร์ (ไม่ต้องพึ่ง lib เพิ่ม)
- QR PromptPay: gen บนฝั่ง client ด้วย `qrcode` (จะเพิ่มลง deps)
- เก็บ template Day Neramit Gold แบบ pixel-perfect ตาม `DayNeramitGoldTemplate.tsx` ใน zip

### หน้าเว็บหลักปัจจุบัน
คงเดิมทั้งหมด เพิ่มลิงก์ "ระบบเอกสาร" เล็ก ๆ ใน header (แสดงเมื่อ login แล้ว)

### ลำดับการทำ
1. เปิด Lovable Cloud + ตั้งค่า auth (email + Google)
2. สร้าง migration: `documents`, `document_counters`, RLS, grants
3. สร้าง server functions (list/get/create/update/delete/duplicate/nextNumber)
4. สร้าง `_authenticated/documents/*` routes + ฟอร์ม + list
5. พอร์ต DayNeramitGoldTemplate + component ย่อย (Header/Items/Summary/Footer/QR)
6. หน้า preview + print CSS
7. เพิ่มปุ่มเข้าระบบเอกสารบน header หลัก

พร้อมลุยครับ ตอบ "ตกลง" หรือแก้ตรงไหนบอกได้เลย