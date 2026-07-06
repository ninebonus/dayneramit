import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0a1628" },
      { title: "Day Neramit — ช่างมืออาชีพ ติดตั้ง ซ่อม ล้างแอร์ CCTV ไฟฟ้า ประปา" },
      { name: "description", content: "Day Neramit ทีมช่างมืออาชีพครบวงจร บริการติดตั้ง ย้าย ซ่อม ล้างแอร์ กล้องวงจรปิด ไฟฟ้า ประปา รีโนเวท ทาสี ปูกระเบื้อง รับประกันงานคุณภาพ ราคายุติธรรม" },
      { name: "keywords", content: "ช่างแอร์, ติดตั้งแอร์, ล้างแอร์, ซ่อมแอร์, ย้ายแอร์, กล้องวงจรปิด, CCTV, ช่างไฟฟ้า, ช่างประปา, ซ่อมเครื่องใช้ไฟฟ้า, ปั๊มน้ำ, หลังคารั่ว, ซ่อมเครื่องซักผ้า, ซ่อมคอมพิวเตอร์, ซ่อมโน้ตบุ๊ก, รีโนเวท, ทาสี, ปูกระเบื้อง, Day Neramit, เดย์ เนรมิต" },
      { name: "author", content: "Day Neramit" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "TH" },
      { name: "geo.placename", content: "Thailand" },
      { property: "og:title", content: "Day Neramit — ช่างมืออาชีพ ติดตั้ง ซ่อม ล้างแอร์ CCTV ไฟฟ้า ประปา" },
      { property: "og:description", content: "Day Neramit ทีมช่างมืออาชีพครบวงจร บริการติดตั้ง ย้าย ซ่อม ล้างแอร์ กล้องวงจรปิด ไฟฟ้า ประปา รีโนเวท ทาสี ปูกระเบื้อง รับประกันงานคุณภาพ ราคายุติธรรม" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "th_TH" },
      { property: "og:site_name", content: "Day Neramit" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Day Neramit — ช่างมืออาชีพ ติดตั้ง ซ่อม ล้างแอร์ CCTV ไฟฟ้า ประปา" },
      { name: "twitter:description", content: "Day Neramit ทีมช่างมืออาชีพครบวงจร บริการติดตั้ง ย้าย ซ่อม ล้างแอร์ กล้องวงจรปิด ไฟฟ้า ประปา รีโนเวท ทาสี ปูกระเบื้อง รับประกันงานคุณภาพ ราคายุติธรรม" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/fgNUcjYy1Ud9gmLhXpLBhMTgTT92/social-images/social-1783349576733-2214.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/fgNUcjYy1Ud9gmLhXpLBhMTgTT92/social-images/social-1783349576733-2214.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://dayneramit.com/#business",
          name: "Day Neramit",
          description: "บริการช่างมืออาชีพครบวงจร ติดตั้ง ซ่อม ล้างแอร์ CCTV ไฟฟ้า ประปา รีโนเวท",
          image: "https://dayneramit.com/og.jpg",
          telephone: "+66-XX-XXX-XXXX",
          priceRange: "฿฿",
          areaServed: { "@type": "Country", name: "Thailand" },
          address: { "@type": "PostalAddress", addressCountry: "TH" },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            opens: "08:00", closes: "20:00",
          },
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
