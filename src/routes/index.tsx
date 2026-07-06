import { createFileRoute } from "@tanstack/react-router";
import {
  Snowflake, Wrench, Sparkles, Move, Camera, Zap, Droplet, Plug,
  Waves, Home, WashingMachine, Laptop, Monitor, Hammer, Paintbrush,
  Grid3x3, HardHat, Phone, MessageCircle, MapPin, Clock, ShieldCheck,
  Star, ArrowRight, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [{ property: "og:url", content: "/" }],
  }),
});

const services = [
  { icon: Snowflake, title: "ติดตั้งแอร์", desc: "ติดตั้งแอร์บ้าน แอร์สำนักงาน ทุกยี่ห้อ" },
  { icon: Move, title: "ย้ายแอร์", desc: "ย้ายแอร์เก่า เดินท่อใหม่ ครบวงจร" },
  { icon: Wrench, title: "ซ่อมแอร์", desc: "แอร์ไม่เย็น มีน้ำหยด เสียงดัง แก้ได้" },
  { icon: Sparkles, title: "ล้างแอร์", desc: "ล้างใหญ่ ฆ่าเชื้อ ประหยัดไฟยิ่งขึ้น" },
  { icon: Camera, title: "กล้องวงจรปิด", desc: "ติดตั้ง CCTV ระบบ IP / HD ครบชุด" },
  { icon: Zap, title: "ระบบไฟฟ้า", desc: "เดินสายไฟ ติดโคม ตรวจระบบ ปลอดภัย" },
  { icon: Droplet, title: "งานประปา", desc: "ท่อรั่ว ท่อตัน เดินท่อใหม่ครบวงจร" },
  { icon: Plug, title: "ซ่อมเครื่องใช้ไฟฟ้า", desc: "ตู้เย็น ไมโครเวฟ พัดลม เตาไฟฟ้า" },
  { icon: Waves, title: "ปั๊มน้ำ", desc: "ติดตั้ง ซ่อมปั๊มน้ำ ปั๊มอัตโนมัติ" },
  { icon: Home, title: "หลังคารั่วซึม", desc: "ตรวจหาจุดรั่ว ซ่อมกันซึมมืออาชีพ" },
  { icon: WashingMachine, title: "เครื่องซักผ้า", desc: "ซ่อมทุกอาการ ทุกยี่ห้อ ถึงบ้าน" },
  { icon: Monitor, title: "คอมพิวเตอร์", desc: "ลง Windows แก้ช้า ไวรัส อัพเกรด" },
  { icon: Laptop, title: "โน้ตบุ๊ก", desc: "เปลี่ยนจอ คีย์บอร์ด แบตเตอรี่" },
  { icon: HardHat, title: "รีโนเวท", desc: "ต่อเติม รีโนเวทบ้าน ออฟฟิศ ครบจบ" },
  { icon: Paintbrush, title: "ทาสี", desc: "ทาสีบ้าน ภายใน ภายนอก งานเนี้ยบ" },
  { icon: Grid3x3, title: "ปูกระเบื้อง", desc: "ปูพื้น ปูผนัง งานประณีต" },
  { icon: Hammer, title: "งานช่างอื่น ๆ", desc: "งานช่างทั่วไป ปรึกษาฟรี" },
];

const features = [
  { icon: ShieldCheck, title: "รับประกันงาน", desc: "รับประกันคุณภาพทุกงาน สบายใจได้" },
  { icon: Clock, title: "รวดเร็ว ตรงเวลา", desc: "นัดแล้วมา ตรงต่อเวลาเสมอ" },
  { icon: Star, title: "ช่างมืออาชีพ", desc: "ประสบการณ์กว่า 10 ปี" },
  { icon: CheckCircle2, title: "ราคายุติธรรม", desc: "แจ้งราคาชัดเจน ไม่มีบวกเพิ่ม" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/40">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <span className="font-semibold tracking-tight">Day Neramit</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition">บริการ</a>
            <a href="#why" className="hover:text-foreground transition">ทำไมเลือกเรา</a>
            <a href="#contact" className="hover:text-foreground transition">ติดต่อ</a>
          </nav>
          <a href="tel:0924367468" className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient text-brand-foreground text-sm font-semibold px-4 py-2 shadow-led hover:brightness-110 transition">
            <Phone className="h-3.5 w-3.5" /> โทรเลย
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-28 pb-20 md:pt-40 md:pb-32 bg-hero overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-brand-gradient blur-3xl opacity-30" />
        </div>
        <div className="max-w-6xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            เปิดบริการทุกวัน 08:00 – 20:00
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            ช่างมืออาชีพ
            <br />
            <span className="text-brand-gradient">ครบจบในทีมเดียว</span>
          </h1>
          <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Day Neramit บริการงานช่างครบวงจร แอร์ ไฟฟ้า ประปา CCTV รีโนเวท
            ด้วยทีมงานมืออาชีพ รับประกันคุณภาพ ราคายุติธรรม
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+66000000000" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-medium px-7 py-3.5 shadow-elevated hover:scale-[1.02] active:scale-[0.98] transition">
              <Phone className="h-4 w-4" /> โทรหาช่างทันที
            </a>
            <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card font-medium px-7 py-3.5 hover:bg-accent transition">
              ดูบริการทั้งหมด <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            {[
              { k: "10+", v: "ปีประสบการณ์" },
              { k: "5,000+", v: "งานที่สำเร็จ" },
              { k: "4.9★", v: "รีวิวลูกค้า" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-2xl md:text-4xl font-bold tracking-tight">{s.k}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-medium text-brand mb-3">บริการของเรา</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">ทุกงานช่าง จบที่เดียว</h2>
            <p className="mt-4 text-muted-foreground">เลือกงานที่คุณต้องการ ทีมช่างมืออาชีพพร้อมให้บริการถึงบ้าน</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {services.map((s) => (
              <div key={s.title} className="group relative rounded-2xl border border-border bg-card p-5 md:p-6 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300">
                <div className="h-11 w-11 rounded-xl bg-brand-gradient text-brand-foreground flex items-center justify-center mb-4 shadow-glow">
                  <s.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="font-semibold text-[15px] leading-tight">{s.title}</h3>
                <p className="mt-1.5 text-xs md:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="py-20 md:py-32 bg-secondary/40 border-y border-border">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-medium text-brand mb-3">ทำไมต้อง Day Neramit</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">มาตรฐานงานช่าง<br />ระดับมืออาชีพ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-card border border-border p-6 shadow-soft">
                <f.icon className="h-8 w-8 text-brand mb-4" strokeWidth={1.8} />
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-14">
            <div className="text-sm font-medium text-brand mb-3">ขั้นตอนง่าย ๆ</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">เรียกช่างง่าย ใน 3 ขั้นตอน</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "แจ้งปัญหา", d: "โทรหรือแชทมาบอกงานที่ต้องการ" },
              { n: "02", t: "รับใบเสนอราคา", d: "แจ้งราคาชัดเจนก่อนเริ่มงาน" },
              { n: "03", t: "ช่างถึงบ้าน", d: "ทีมช่างเข้าดำเนินงานตามนัด" },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="text-4xl font-bold text-brand-gradient mb-3">{s.n}</div>
                <h3 className="font-semibold text-lg">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-32 bg-hero">
        <div className="max-w-4xl mx-auto px-5">
          <div className="relative rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 text-center overflow-hidden shadow-elevated">
            <div className="absolute inset-0 opacity-20 bg-brand-gradient" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                พร้อมให้บริการคุณวันนี้
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
                ปรึกษาฟรี ประเมินราคาก่อนงาน ทีมช่างมืออาชีพพร้อมเดินทางถึงบ้านคุณ
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="tel:+66000000000" className="inline-flex items-center justify-center gap-2 rounded-full bg-background text-foreground font-medium px-7 py-3.5 hover:opacity-90 transition">
                  <Phone className="h-4 w-4" /> โทร 0XX-XXX-XXXX
                </a>
                <a href="https://line.me/" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/20 font-medium px-7 py-3.5 hover:bg-primary-foreground/10 transition">
                  <MessageCircle className="h-4 w-4" /> แชท LINE
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> ให้บริการทั่วประเทศไทย</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> เปิดทุกวัน 08:00–20:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Logo className="h-5 w-5" />
            <span className="font-semibold text-foreground">Day Neramit</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <a href="#services" className="hover:text-foreground">บริการ</a>
            <a href="#why" className="hover:text-foreground">เกี่ยวกับ</a>
            <a href="#contact" className="hover:text-foreground">ติดต่อ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-label="Day Neramit logo" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dn-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.19 245)" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 220)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#dn-g)" />
      <path d="M13 12h6.5a8 8 0 0 1 0 16H13V12z" fill="white" opacity="0.95" />
      <circle cx="19.5" cy="20" r="3.4" fill="url(#dn-g)" />
    </svg>
  );
}
