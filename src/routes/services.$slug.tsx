import { createFileRoute, notFound, Link, useRouter } from "@tanstack/react-router";
import {
  Snowflake, Wrench, Sparkles, Move, Camera, Zap, Droplet, Plug,
  Waves, Home, WashingMachine, Laptop, Monitor, Hammer, Paintbrush,
  Grid3x3, HardHat, Phone, MessageCircle, MapPin, Clock, CheckCircle2,
  ArrowLeft, ArrowRight,
} from "lucide-react";
import { services, serviceBySlug, type ServiceIconKey } from "@/data/services";

const PHONE = "0924367468";
const LINE_URL = "https://line.me/R/ti/p/~xevilteam";
const SITE = "https://dayneramit.lovable.app";

const iconMap: Record<ServiceIconKey, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  snowflake: Snowflake, move: Move, wrench: Wrench, sparkles: Sparkles,
  camera: Camera, zap: Zap, droplet: Droplet, plug: Plug,
  waves: Waves, home: Home, washer: WashingMachine, monitor: Monitor,
  laptop: Laptop, hardhat: HardHat, paint: Paintbrush, grid: Grid3x3, hammer: Hammer,
};

function encodeSlug(slug: string) {
  return encodeURIComponent(slug);
}

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = serviceBySlug[decodeURIComponent(params.slug)];
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "ไม่พบบริการ — Day Neramit" }, { name: "robots", content: "noindex" }] };
    }
    const url = `${SITE}/services/${encodeSlug(params.slug)}`;
    const img = `${SITE}${loaderData.image}`;
    const svcLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: loaderData.title,
      description: loaderData.metaDesc,
      image: img,
      areaServed: [
        { "@type": "City", name: "นนทบุรี" },
        { "@type": "City", name: "บางใหญ่" },
        { "@type": "City", name: "บางบัวทอง" },
        { "@type": "City", name: "ปากเกร็ด" },
      ],
      provider: {
        "@type": "LocalBusiness",
        name: "Day Neramit",
        telephone: "+66924367468",
        areaServed: "TH-12",
      },
      url,
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "บริการ", item: `${SITE}/#services` },
        { "@type": "ListItem", position: 3, name: loaderData.title, item: url },
      ],
    };
    const faqLd = loaderData.faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: loaderData.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;
    return {
      links: [{ rel: "canonical", href: url }],
      meta: [
        { title: loaderData.metaTitle },
        { name: "description", content: loaderData.metaDesc },
        { name: "keywords", content: loaderData.keywords },
        { name: "geo.region", content: "TH-12" },
        { name: "geo.placename", content: "Nonthaburi, Bang Yai, Bang Bua Thong" },
        { name: "geo.position", content: "13.859;100.5215" },
        { name: "ICBM", content: "13.859, 100.5215" },
        { property: "og:title", content: loaderData.metaTitle },
        { property: "og:description", content: loaderData.metaDesc },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "th_TH" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: loaderData.metaTitle },
        { name: "twitter:description", content: loaderData.metaDesc },
        { name: "twitter:image", content: img },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(svcLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
        ...(faqLd ? [{ type: "application/ld+json", children: JSON.stringify(faqLd) }] : []),
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: ServiceNotFound,
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold">โหลดหน้าไม่สำเร็จ</h1>
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient text-brand-foreground px-6 py-3 font-semibold btn-neon"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    );
  },
});

function ServiceNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-5">
      <div className="text-center">
        <h1 className="text-3xl font-bold">ไม่พบบริการที่คุณต้องการ</h1>
        <p className="mt-3 text-muted-foreground">อาจถูกลบหรือย้ายไปยังหน้าอื่น</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient text-brand-foreground px-6 py-3 font-semibold btn-neon"
        >
          <ArrowLeft className="h-4 w-4" /> กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}

function ServicePage() {
  const s = Route.useLoaderData();
  const Icon = iconMap[s.icon];
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" /> Day Neramit
          </Link>
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
      <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 bg-hero overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="max-w-6xl mx-auto px-5">
          <nav aria-label="breadcrumb" className="text-xs text-muted-foreground mb-6 flex flex-wrap gap-2">
            <Link to="/" className="hover:text-foreground">หน้าแรก</Link>
            <span>/</span>
            <Link to="/" hash="services" className="hover:text-foreground">บริการ</Link>
            <span>/</span>
            <span className="text-foreground">{s.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium mb-5 shadow-led">
                <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                <span>บริการช่างมืออาชีพ · นนทบุรี บางใหญ่ บางบัวทอง</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                {s.h1}
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                {s.intro}
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${PHONE}`}
                  className="relative inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient text-brand-foreground font-semibold px-7 py-3.5 btn-neon overflow-hidden isolate"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" /> โทรหาช่างทันที
                  </span>
                  <span aria-hidden className="btn-neon-sweep"><span className="btn-neon-sweep-inner" /></span>
                </a>
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur text-foreground font-semibold px-7 py-3.5 hover:border-brand/60 hover:shadow-led transition"
                >
                  <MessageCircle className="h-4 w-4" /> แชท LINE
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand" /> นนทบุรี · บางใหญ่ · บางบัวทอง</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-brand" /> เปิดทุกวัน 08:00–20:00</span>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-border shadow-elevated">
              <img
                src={s.image}
                alt={`${s.title} โดยช่างไทยมืออาชีพในพื้นที่นนทบุรี บางใหญ่ บางบัวทอง — Day Neramit`}
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5">
          <div className="max-w-2xl mb-10">
            <div className="text-sm font-medium text-brand mb-3">รายละเอียดบริการ</div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              จุดเด่นบริการ<span className="text-brand-gradient">{s.title}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {s.highlights.map((h) => (
              <div key={h} className="flex gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-brand/50 hover:shadow-glow transition">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <p className="text-sm md:text-base leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {s.faq.length > 0 && (
        <section className="py-14 md:py-20 bg-secondary/30 border-y border-border">
          <div className="max-w-4xl mx-auto px-5">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8">คำถามที่พบบ่อย</h2>
            <div className="space-y-3">
              {s.faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 open:shadow-glow open:border-brand/50 transition">
                  <summary className="cursor-pointer font-semibold text-base md:text-lg flex items-center justify-between gap-4">
                    {f.q}
                    <ArrowRight className="h-4 w-4 text-brand group-open:rotate-90 transition" />
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OTHER SERVICES */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-8">
            <div className="text-sm font-medium text-brand mb-3">บริการอื่น ๆ</div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">ทีมช่างเราให้บริการครบวงจร</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {others.map((o) => {
              const OIcon = iconMap[o.icon];
              return (
                <Link
                  key={o.slug}
                  to="/services/$slug"
                  params={{ slug: o.slug }}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-soft hover:border-brand/50 hover:shadow-glow transition"
                >
                  <div className="h-10 w-10 rounded-xl bg-brand-gradient text-brand-foreground flex items-center justify-center shadow-led group-hover:scale-110 transition">
                    <OIcon className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <div className="text-xs md:text-sm font-medium text-center leading-tight">{o.title}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-hero">
        <div className="max-w-4xl mx-auto px-5">
          <div className="relative rounded-3xl border border-brand/30 bg-card/80 p-10 md:p-14 text-center overflow-hidden shadow-glow">
            <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              ต้องการ<span className="text-brand-gradient">{s.title}</span>?
            </h2>
            <p className="mt-4 text-muted-foreground">
              โทรหาช่าง Day Neramit ปรึกษาฟรี ประเมินราคาก่อนงาน
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${PHONE}`}
                className="relative inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient text-brand-foreground font-semibold px-7 py-3.5 btn-neon overflow-hidden isolate"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" /> โทรหาช่างทันที
                </span>
                <span aria-hidden className="btn-neon-sweep"><span className="btn-neon-sweep-inner" /></span>
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur text-foreground font-semibold px-7 py-3.5 hover:border-brand/60 hover:shadow-led transition"
              >
                <MessageCircle className="h-4 w-4" /> แชท LINE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-5 text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← กลับหน้าแรก Day Neramit</Link>
        </div>
      </footer>

      {/* FAB */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 md:hidden">
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" aria-label="แชท LINE"
          className="h-12 w-12 rounded-full bg-card border border-brand/50 text-brand flex items-center justify-center shadow-led">
          <MessageCircle className="h-5 w-5" />
        </a>
        <a href={`tel:${PHONE}`} aria-label="โทรหาช่าง"
          className="relative h-12 w-12 rounded-full bg-brand-gradient text-brand-foreground flex items-center justify-center btn-neon overflow-hidden isolate">
          <Phone className="h-5 w-5 relative z-10" />
          <span aria-hidden className="btn-neon-sweep"><span className="btn-neon-sweep-inner" /></span>
        </a>
      </div>
    </div>
  );
}
