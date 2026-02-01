import { Html, MainLayout, MaxWidthContainer } from "@/layout/main";

export default function Page() {
  return (
    <Html>
      <MainLayout>
        <MaxWidthContainer class="flex flex-col gap-8 items-start justify-center">
          <div class="flex flex-col gap-8">
            <h1 class="text-2xl font-bold leading-[1.2] mt-16">Welcome to Unbounded Pioneering.</h1>
            <p class="text-md">
              We are a startup based in Tokyo, established in June, 2024.
              <br /> We build and deliver breakthroughs to redefine what's possible.
            </p>
            <p class="text-md">
              We are working on{" "}
              <a href="https://turnint.ai" class="underline font-bold">
                Turnint AI
              </a>
            </p>
            <p>If you are interested in our work, please let us know.</p>
            <p>— The entire u17g team</p>
          </div>
        </MaxWidthContainer>
      </MainLayout>
    </Html>
  );
}
