import { useCreateLocaledLink, useInlineTranslation, useLocale } from "@/hooks/translation";
import { cn } from "@/utils/cn";
import type { Child } from "hono/jsx";

export function Html({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: Child;
}) {
  const locale = useLocale();
  const t = useInlineTranslation();
  return (
    <html lang={locale.path} class="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {title
            ? `${title} | Unbounded Pioneering`
            : t({
                en: "Unbounded Pioneering",
                ja: "Unbounded Pioneering",
              })}
        </title>
        {description && <meta name="description" content={description} />}
        <link href="/styles.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400..600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/static/images/favicon.png" />
      </head>
      <body class="bg-zinc-800 text-zinc-200">{children}</body>
    </html>
  );
}

export function MainLayout({ children }: { children: Child }) {
  return (
    <div class="grid grid-cols-[16px_repeat(12,calc(calc(100%-32px)/12))_16px]">
      {/* Noise */}
      <div
        class={cn(
          "pointer-events-none",
          "row-span-full col-span-full grid grid-cols-subgrid",
          "bg-[url('/static/images/noise.png')] bg-repeat bg-size-[200px_200px] opacity-[0.12] mix-blend-soft-light",
        )}
      />
      <div class={cn("row-span-full col-span-full grid grid-cols-subgrid")}>
        <HeadSpacer />
        <main class="row-span-full col-span-full grid grid-cols-subgrid">
          <div class="col-[2/-2] border-zinc-600 border-x">
            <div class="flex flex-row justify-center animate-appear min-h-[calc(100vh-16px)] p-4">
              {children}
            </div>
          </div>
        </main>
        <Footer />
        <FootSpacer />
      </div>
    </div>
  );
}

export function MaxWidthContainer({
  children,
  class: className,
}: {
  children: Child;
  class?: string;
}) {
  return <div class={cn("w-[100%] max-w-[600px]", className)}>{children}</div>;
}

function HeadSpacer() {
  return (
    <div class="row-span-full col-span-full grid grid-cols-subgrid border-b border-zinc-600 h-[16px]"></div>
  );
}

function FootSpacer() {
  return (
    <div class="col-span-full h-[16px] grid grid-cols-subgrid">
      <div class="col-[2/-2] border-x border-zinc-600"></div>
    </div>
  );
}

function Footer() {
  const t = useInlineTranslation();
  const createLink = useCreateLocaledLink();
  return (
    <footer
      class={cn(
        "col-span-full grid grid-cols-subgrid",
        "border-y border-zinc-600 text-sm text-zinc-300",
      )}
    >
      <div class="col-[2/-2] border-zinc-600 border-x flex flex-col items-center h-full justify-center">
        <div class="flex flex-row gap-16 justify-start sm:justify-center my-16 w-full flex-wrap max-w-[600px] px-4">
          <img src="/static/images/logo.png" alt="Unbounded Pioneering Inc." class="h-10" />
        </div>
        <div class="flex flex-row justify-start sm:justify-center gap-8 sm:gap-16 w-full max-w-[600px] flex-wrap">
          <div class="flex flex-col gap-2 flex-nowrap px-4 w-full sm:w-fit">
            <div class="flex gap-2 font-bold text-zinc-200">Company</div>
            <a href={createLink("/changelog")} class="hover:underline">
              {t({ en: "Changelog", ja: "沿革" })}
            </a>
            <a href="https://github.com/u17g" class="hover:underline">
              Github
            </a>
            <a href="mailto:support@u17g.com" class="hover:underline">
              {t({ en: "Email us", ja: "お問い合わせ" })}
            </a>
          </div>
          <div class="flex flex-col gap-2 flex-nowrap px-4 w-full sm:w-fit">
            <div class="flex gap-2 font-bold text-zinc-200">Product</div>
            <a href="https://senditly.ai" class="hover:underline">
              Senditly
            </a>
          </div>
          <div class="flex flex-col gap-2 flex-nowrap px-4 w-full sm:w-fit">
            <div class="flex gap-2 font-bold text-zinc-200">Language</div>
            <a href={"/"} class="hover:underline">
              English
            </a>
            <a href={"/ja-jp/"} class="hover:underline">
              日本語
            </a>
          </div>
        </div>
        <div class="flex flex-row gap-4 sm:gap-8 justify-start sm:justify-center my-16 px-4 flex-wrap max-w-[600px]">
          <div class="text-nowrap">
            {t({
              en: "© 2025 Unbounded Pioneering Inc.",
              ja: "© 2025 Unbounded Pioneering株式会社",
            })}
          </div>
          <a
            href={createLink("/legal/privacy", "https://senditly.ai")}
            class="hover:underline text-nowrap w-full sm:w-fit"
          >
            {t({ en: "Privacy Policy", ja: "プライバシーポリシー" })}
          </a>
          <div>
            {t({
              en: "Yamato Billding 405, 1-6-16 Kandaizumi-cho, Chiyoda-Ku, Tokyo, 101-0024",
              ja: "〒101-0024 東京都千代田区神田和泉町1番地6-16 ヤマトビル405",
            })}
          </div>
          <a href="https://x.com/ryosukecla" class="hover:underline text-nowrap">
            {t({
              en: "Ryosuke Suzuki, Founder",
              ja: "鈴木 凌介, 代表取締役",
            })}
          </a>
        </div>
      </div>
    </footer>
  );
}
