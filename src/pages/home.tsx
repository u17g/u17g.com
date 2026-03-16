import { useCreateLocaledLink, useInlineTranslation } from "@/hooks/translation";
import { Html, MainLayout, MaxWidthContainer } from "@/layout/main";

export default function Page() {
  const t = useInlineTranslation();
  const createLink = useCreateLocaledLink();
  return (
    <Html>
      <MainLayout>
        <MaxWidthContainer class="flex flex-col gap-8 items-start justify-center">
          <div class="flex flex-col gap-8">
            <h1 class="text-2xl font-bold leading-[1.2] mt-16">
              {t({
                en: "Welcome to Unbounded Pioneering.",
                ja: "Unbounded Pioneering へようこそ。",
              })}
            </h1>
            <p class="text-md">
              {t({
                en: "We are a startup based in Tokyo, established in June, 2024.",
                ja: "私たちは2024年6月に設立された、東京を拠点とするスタートアップです。",
              })}
              <br />
              {t({
                en: " We build and deliver breakthroughs to redefine what's possible.",
                ja: " 常識を覆すブレイクスルーを生み出し、届けることを目指しています。",
              })}
            </p>
            <p class="text-md">
              {t({
                en: (
                  <>
                    We are working on{" "}
                    <a href="https://turnint.ai" class="underline font-bold">
                      Turnint AI
                    </a>
                  </>
                ),
                ja: (
                  <>
                    私たちは今、
                    <a href="https://turnint.ai" class="underline font-bold">
                      Turnint AI
                    </a>{" "}
                    に取り組んでいます。
                  </>
                ),
              })}
            </p>
            <p>
              {t({
                en: "If you are interested in our work, please let us know.",
                ja: "私たちの活動にご興味がありましたら、お気軽にご連絡ください。",
              })}
            </p>
            <p>
              <a href={createLink("/team")} class="underline font-bold">
                {t({ en: "— The entire u17g team", ja: "— u17g チーム" })}
              </a>
            </p>
          </div>
        </MaxWidthContainer>
      </MainLayout>
    </Html>
  );
}
