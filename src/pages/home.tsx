import { Html, MainLayout } from "@/layout/main";
import { useInlineTranslation } from "@/hooks/translation";

export default function Page() {
  const t = useInlineTranslation();
  return (
    <Html>
      <MainLayout>
        <div class="flex flex-col gap-8 items-start justify-center max-w-[600px] w-[100%] min-h-[calc(100vh-16px)]">
          <div class="flex flex-col gap-8 p-8">
            <h1 class="text-2xl font-bold leading-[1.2] mt-16">Welcome to Unbounded Pioneering.</h1>
            <p class="text-md">
              We are a startup based in Tokyo, established in June, 2024.
              <br /> We build and deliver breakthroughs to redefine what's possible.
            </p>
            <p class="text-md">
              Our first work is{" "}
              <a href="https://senditly.ai" class="underline font-bold">
                Senditly
              </a>
              , the next-gen interactive email platform that converts. We are highly focusing on the
              product for our early customers' success. So it's not open to public yet.
            </p>
            <p>If you are interested in our work, please let us know.</p>
            <p class="text-md">
              <b>Trusted by</b>
              <div class="flex flex-row gap-4 items-center">
                <img
                  src="/static/images/logo-plaid.svg"
                  alt="plaid.co.jp"
                  class="h-[20px] w-auto"
                  loading="lazy"
                />
                <img
                  src="/static/images/logo-codatum.svg"
                  alt="codatum.com"
                  class="h-[17px] w-auto"
                  loading="lazy"
                />
              </div>
            </p>
            <p>— The entire u17g team</p>
          </div>
        </div>
      </MainLayout>
    </Html>
  );
}
