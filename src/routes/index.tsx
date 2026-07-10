import { createFileRoute } from "@tanstack/react-router";
import {
  Snowflake, Wrench, Sparkles, Move, Camera, Zap, Droplet, Plug,
  Waves, Home, WashingMachine, Laptop, Monitor, Hammer, Paintbrush,
  Grid3x3, HardHat, Phone, MessageCircle, MapPin, Clock, ShieldCheck,
  Star, ArrowRight, CheckCircle2,
} from "lucide-react";
import heroImg from "@/assets/hero-neon.jpg";
import imgAir from "@/assets/service-air.jpg";
import imgCctv from "@/assets/service-cctv.jpg";
import imgElectric from "@/assets/service-electric.jpg";
import imgPlumbing from "@/assets/service-plumbing.jpg";

const PHONE = "0924367468";
const LINE_URL = "https://line.me/R/ti/p/~xevilteam";
const SITE_TITLE = "Day Neramit ช่างนนทบุรี บางใหญ่ บางบัวทอง — ติดตั้ง/ซ่อม/ล้างแอร์ CCTV ไฟฟ้า ประปา";
const SITE_DESC =
  "Day Neramit ช่างมืออาชีพ พื้นที่นนทบุรี บางใหญ่ บางบัวทอง บริการติดตั้งแอร์ ย้ายแอร์ ซ่อมแอร์ ล้างแอร์ กล้องวงจรปิด CCTV ระบบไฟฟ้า งานประปา ปั๊มน้ำ หลังคารั่ว รีโนเวท ทาสี ปูกระเบื้อง โทรได้ตลอด";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://dayneramit.com/#business",
  name: "Day Neramit ช่างครบวงจร นนทบุรี",
  description: SITE_DESC,
  telephone: "+66924367468",
  priceRange: "฿฿",
  image: "https://dayneramit.com/og.jpg",
  areaServed: [
    { "@type": "City", name: "นนทบุรี" },
    { "@type": "City", name: "บางใหญ่" },
    { "@type": "City", name: "บางบัวทอง" },
    { "@type": "City", name: "ปากเกร็ด" },
    { "@type": "City", name: "บางกรวย" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "นนทบุรี",
    addressRegion: "นนทบุรี",
    addressCountry: "TH",
  },
  geo: { "@type": "GeoCoordinates", latitude: 13.859, longitude: 100.5215 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "08:00", closes: "20:00",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "312" },
  makesOffer: [
    "ติดตั้งแอร์","ย้ายแอร์","ซ่อมแอร์","ล้างแอร์",
    "ติดตั้งกล้องวงจรปิด CCTV","ระบบไฟฟ้า","งานประปา","ปั๊มน้ำ",
    "หลังคารั่วซึม","ซ่อมเครื่องซักผ้า","ซ่อมคอมพิวเตอร์","ซ่อมโน้ตบุ๊ก",
    "รีโนเวท","ทาสี","ปูกระเบื้อง",
  ].map((s) => ({ "@type": "Offer", name: s })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Day Neramit ให้บริการพื้นที่ไหนบ้าง?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ให้บริการทั่วจังหวัดนนทบุรี ครอบคลุมบางใหญ่ บางบัวทอง ปากเกร็ด บางกรวย ไทรน้อย เมืองนนทบุรี รัตนาธิเบศร์ งามวงศ์วาน แคราย และพื้นที่ใกล้เคียง",
      },
    },
    {
      "@type": "Question",
      name: "ล้างแอร์บ้านราคาเท่าไหร่?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ราคาล้างแอร์เริ่มต้นตามขนาด BTU และประเภทแอร์ แจ้งราคาชัดเจนก่อนเริ่มงาน ไม่มีบวกเพิ่ม โทรสอบถามได้ที่ 092-436-7468",
      },
    },
    {
      "@type": "Question",
      name: "รับติดตั้งกล้องวงจรปิด (CCTV) ไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "รับติดตั้งกล้องวงจรปิดทุกยี่ห้อ ทั้งระบบ IP และ HD พร้อมเดินสาย ตั้งค่าดูผ่านมือถือ รับประกันงานติดตั้ง",
      },
    },
    {
      "@type": "Question",
      name: "เปิดให้บริการวันไหนบ้าง?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "เปิดบริการทุกวัน ตั้งแต่ 08:00 – 20:00 น. โทร 092-436-7468 หรือแชท LINE ได้ตลอด",
      },
    },
  ],
};

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    links: [{ rel: "canonical", href: "https://dayneramit.com/" }],
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      {
        name: "keywords",
        content:
          "ช่างนนทบุรี, ช่างบางใหญ่, ช่างบางบัวทอง, ติดตั้งแอร์นนทบุรี, ล้างแอร์บางใหญ่, ซ่อมแอร์บางบัวทอง, ย้ายแอร์นนทบุรี, กล้องวงจรปิดนนทบุรี, CCTV บางใหญ่, ช่างไฟฟ้านนทบุรี, ช่างประปานนทบุรี, ปั๊มน้ำนนทบุรี, หลังคารั่วนนทบุรี, ซ่อมเครื่องซักผ้านนทบุรี, ซ่อมคอมนนทบุรี, ซ่อมโน้ตบุ๊คบางใหญ่, รีโนเวทนนทบุรี, ทาสีบางบัวทอง, ปูกระเบื้องนนทบุรี, ช่างครบวงจร, Day Neramit",
      },
      { name: "geo.region", content: "TH-12" },
      { name: "geo.placename", content: "Nonthaburi, Bang Yai, Bang Bua Thong" },
      { name: "geo.position", content: "13.859;100.5215" },
      { name: "ICBM", content: "13.859, 100.5215" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "th_TH" },
      { property: "og:url", content: "https://dayneramit.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
});

const services = [
  { icon: Snowflake, title: "ติดตั้งแอร์", desc: "ติดตั้งแอร์บ้าน สำนักงาน ทุกยี่ห้อ นนทบุรี บางใหญ่" },
  { icon: Move, title: "ย้ายแอร์", desc: "ย้ายแอร์เก่า เดินท่อใหม่ ครบวงจร" },
  { icon: Wrench, title: "ซ่อมแอร์", desc: "แอร์ไม่เย็น น้ำหยด เสียงดัง แก้ได้" },
  { icon: Sparkles, title: "ล้างแอร์", desc: "ล้างใหญ่ ฆ่าเชื้อ ประหยัดไฟ" },
  { icon: Camera, title: "กล้องวงจรปิด CCTV", desc: "ติดตั้ง CCTV IP / HD ครบชุด" },
  { icon: Zap, title: "ระบบไฟฟ้า", desc: "เดินสายไฟ ติดโคม ตรวจระบบ" },
  { icon: Droplet, title: "งานประปา", desc: "ท่อรั่ว ท่อตัน เดินท่อใหม่" },
  { icon: Plug, title: "ซ่อมเครื่องใช้ไฟฟ้า", desc: "ตู้เย็น ไมโครเวฟ พัดลม" },
  { icon: Waves, title: "ปั๊มน้ำ", desc: "ติดตั้ง ซ่อมปั๊มน้ำอัตโนมัติ" },
  { icon: Home, title: "หลังคารั่วซึม", desc: "ตรวจหาจุดรั่ว ซ่อมกันซึม" },
  { icon: WashingMachine, title: "เครื่องซักผ้า", desc: "ซ่อมทุกอาการ ทุกยี่ห้อ ถึงบ้าน" },
  { icon: Monitor, title: "คอมพิวเตอร์", desc: "ลง Windows แก้ช้า ไวรัส อัพเกรด" },
  { icon: Laptop, title: "โน้ตบุ๊ก", desc: "เปลี่ยนจอ คีย์บอร์ด แบตเตอรี่" },
  { icon: HardHat, title: "รีโนเวท", desc: "ต่อเติม รีโนเวทบ้าน ออฟฟิศ" },
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

const areas = [
  "นนทบุรี", "บางใหญ่", "บางบัวทอง", "ปากเกร็ด", "บางกรวย",
  "ไทรน้อย", "เมืองนนทบุรี", "รัตนาธิเบศร์", "งามวงศ์วาน", "แคราย",
  "บางรักน้อย", "บางรักใหญ่", "เสาธงหิน", "พิมลราช", "โสนลอย",
];

function NeonButton({
  href, variant = "primary", children, external = false,
}: {
  href: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  external?: boolean;
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold px-7 py-3.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] overflow-hidden isolate";
  const styles =
    variant === "primary"
      ? "bg-brand-gradient text-brand-foreground btn-neon"
      : "border border-border bg-card/60 backdrop-blur text-foreground hover:border-brand/60 hover:shadow-led";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${styles}`}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span aria-hidden className="btn-neon-sweep">
          <span className="btn-neon-sweep-inner" />
        </span>
      )}
    </a>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hidden SEO content for crawlers */}
      <h1 className="sr-only">
        Day Neramit ช่างมืออาชีพ นนทบุรี บางใหญ่ บางบัวทอง — ติดตั้งแอร์ ซ่อมแอร์ ล้างแอร์ ย้ายแอร์ กล้องวงจรปิด CCTV ระบบไฟฟ้า งานประปา ปั๊มน้ำ หลังคารั่ว เครื่องซักผ้า ซ่อมคอม โน้ตบุ๊ก รีโนเวท ทาสี ปูกระเบื้อง
      </h1>
      <p className="sr-only">
        บริการช่างครบวงจรในพื้นที่จังหวัดนนทบุรี ครอบคลุมอำเภอบางใหญ่ บางบัวทอง ปากเกร็ด บางกรวย ไทรน้อย เมืองนนทบุรี รัตนาธิเบศร์ งามวงศ์วาน แคราย บางรักน้อย เสาธงหิน พิมลราช โสนลอย ช่างแอร์นนทบุรี ช่างไฟฟ้านนทบุรี ช่างประปานนทบุรี ติดตั้งกล้องวงจรปิดนนทบุรี ล้างแอร์บางใหญ่ ซ่อมแอร์บางบัวทอง ปรึกษาฟรี โทร 0924367468
      </p>

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <span className="font-semibold tracking-tight">Day Neramit</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition">บริการ</a>
            <a href="#areas" className="hover:text-foreground transition">พื้นที่</a>
            <a href="#why" className="hover:text-foreground transition">ทำไมเลือกเรา</a>
            <a href="#contact" className="hover:text-foreground transition">ติดต่อ</a>
          </nav>
          <a
            href={`tel:${PHONE}`}
            className="relative inline-flex items-center gap-1.5 rounded-full bg-brand-gradient text-brand-foreground text-sm font-semibold px-4 py-2 btn-neon overflow-hidden isolate"
          >
            <span className="relative z-10 inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> โทรเลย
            </span>
            <span aria-hidden className="btn-neon-sweep"><span className="btn-neon-sweep-inner" /></span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-24 pb-20 md:pt-36 md:pb-32 bg-hero overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-brand-gradient blur-3xl opacity-25 -z-10" />

        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium mb-6 shadow-led">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-foreground/90">เปิดบริการทุกวัน 08:00 – 20:00 · นนทบุรี บางใหญ่ บางบัวทอง</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              ช่างมืออาชีพ
              <br />
              <span className="text-brand-gradient">ครบจบในทีมเดียว</span>
            </h2>
            <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Day Neramit บริการงานช่างครบวงจร แอร์ ไฟฟ้า ประปา CCTV รีโนเวท
              ทีมงานมืออาชีพในพื้นที่ <strong className="text-foreground">นนทบุรี บางใหญ่ บางบัวทอง</strong> รับประกันคุณภาพ
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <NeonButton href={`tel:${PHONE}`} variant="primary">
                <Phone className="h-4 w-4" /> โทรหาช่างทันที
              </NeonButton>
              <NeonButton href={LINE_URL} variant="ghost" external>
                <MessageCircle className="h-4 w-4" /> แชท LINE
              </NeonButton>
            </div>
          </div>

          {/* Hero image */}
          <div className="mt-14 md:mt-20 relative">
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-elevated">
              <img
                src={heroImg}
                alt="ช่างมืออาชีพ Day Neramit บริการงานช่างครบวงจรในนนทบุรี บางใหญ่ บางบัวทอง"
                width={1600}
                height={1024}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl">
                  {[
                    { k: "10+", v: "ปีประสบการณ์" },
                    { k: "5,000+", v: "งานสำเร็จ" },
                    { k: "4.9★", v: "รีวิวลูกค้า" },
                  ].map((s) => (
                    <div key={s.v}>
                      <div className="text-2xl md:text-4xl font-bold tracking-tight text-brand-gradient">{s.k}</div>
                      <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-medium text-brand mb-3">บริการของเรา</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">ทุกงานช่าง จบที่เดียว</h2>
            <p className="mt-4 text-muted-foreground">ทีมช่างในนนทบุรี บางใหญ่ บางบัวทอง พร้อมให้บริการถึงบ้าน</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {services.map((s) => (
              <article
                key={s.title}
                className="group relative rounded-2xl border border-border bg-card p-5 md:p-6 shadow-soft hover:border-brand/50 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-gradient text-brand-foreground flex items-center justify-center mb-4 shadow-led group-hover:scale-110 transition">
                  <s.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="font-semibold text-[15px] leading-tight">{s.title}</h3>
                <p className="mt-1.5 text-xs md:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section id="areas" className="py-20 md:py-28 bg-secondary/40 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-sm font-medium text-brand mb-3">พื้นที่ให้บริการ</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              นนทบุรี · <span className="text-brand-gradient">บางใหญ่</span> · บางบัวทอง
            </h2>
            <p className="mt-4 text-muted-foreground">
              ให้บริการครอบคลุมทั่วจังหวัดนนทบุรีและอำเภอใกล้เคียง เดินทางถึงบ้านคุณรวดเร็ว
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {areas.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-4 py-2 text-sm hover:border-brand/60 hover:shadow-led transition"
              >
                <MapPin className="h-3.5 w-3.5 text-brand" /> {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-medium text-brand mb-3">ทำไมต้อง Day Neramit</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              มาตรฐานงานช่าง<br />ระดับมืออาชีพ
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-card border border-border p-6 shadow-soft hover:border-brand/50 hover:shadow-glow transition"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-gradient text-brand-foreground flex items-center justify-center mb-4 shadow-led">
                  <f.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 md:py-28">
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
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-glow hover:border-brand/40 transition">
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
          <div className="relative rounded-3xl border border-brand/30 bg-card/80 p-10 md:p-16 text-center overflow-hidden shadow-glow">
            <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-brand-gradient blur-3xl opacity-30 -z-10" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                พร้อมให้บริการ<br />
                <span className="text-brand-gradient">นนทบุรี บางใหญ่ บางบัวทอง</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                ปรึกษาฟรี ประเมินราคาก่อนงาน ทีมช่างมืออาชีพพร้อมเดินทางถึงบ้านคุณ
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <NeonButton href={`tel:${PHONE}`} variant="primary">
                  <Phone className="h-4 w-4" /> โทรหาช่างทันที
                </NeonButton>
                <NeonButton href={LINE_URL} variant="ghost" external>
                  <MessageCircle className="h-4 w-4" /> แชท LINE
                </NeonButton>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand" /> นนทบุรี · บางใหญ่ · บางบัวทอง</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-brand" /> เปิดทุกวัน 08:00–20:00</span>
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
            <a href="#areas" className="hover:text-foreground">พื้นที่</a>
            <a href="#why" className="hover:text-foreground">เกี่ยวกับ</a>
            <a href="#contact" className="hover:text-foreground">ติดต่อ</a>
          </div>
        </div>
      </footer>

      {/* Floating action buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 md:hidden">
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="แชท LINE"
          className="h-12 w-12 rounded-full bg-card border border-brand/50 text-brand flex items-center justify-center shadow-led"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href={`tel:${PHONE}`}
          aria-label="โทรหาช่าง"
          className="relative h-12 w-12 rounded-full bg-brand-gradient text-brand-foreground flex items-center justify-center btn-neon overflow-hidden isolate"
        >
          <Phone className="h-5 w-5 relative z-10" />
          <span aria-hidden className="btn-neon-sweep"><span className="btn-neon-sweep-inner" /></span>
        </a>
      </div>

      <ArrowRight className="hidden" aria-hidden />
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-label="Day Neramit logo" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dn-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.18 200)" />
          <stop offset="100%" stopColor="oklch(0.85 0.24 155)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#dn-g)" />
      <path d="M13 12h6.5a8 8 0 0 1 0 16H13V12z" fill="#0a1420" opacity="0.9" />
      <circle cx="19.5" cy="20" r="3.4" fill="url(#dn-g)" />
    </svg>
  );
}
