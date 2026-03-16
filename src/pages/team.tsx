import { useInlineTranslation } from "@/hooks/translation";
import { Html, MainLayout, MaxWidthContainer } from "@/layout/main";

const members = [
  {
    name: { en: "Ryosuke Suzuki", ja: "鈴木 凌介" },
    role: { en: "Founder & CEO", ja: "代表取締役" },
    image: "/static/images/people/ryosuke-suzuki.png",
  },
  {
    name: { en: "Shinobu Miyahara", ja: "宮原 忍" },
    role: { en: "Outside Advisor", ja: "社外アドバイザー" },
    image: "/static/images/people/shinobu-miyahara.png",
  },
];

export default function Page() {
  const t = useInlineTranslation();
  return (
    <Html title={t({ en: "Team - Unbounded Pioneering", ja: "チーム - Unbounded Pioneering" })}>
      <MainLayout>
        <MaxWidthContainer class="flex flex-col gap-8 items-start justify-center">
          <h1 class="text-2xl font-bold leading-[1.2] mt-16">
            {t({ en: "u17g team", ja: "u17g チーム" })}
          </h1>
          <div class="flex flex-col gap-8 w-full">
            {members.map((member) => (
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-md bg-zinc-700 overflow-hidden flex-shrink-0">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={t(member.name)}
                      class="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p class="font-bold">{t(member.name)}</p>
                  <p class="text-sm text-zinc-400">{t(member.role)}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthContainer>
      </MainLayout>
    </Html>
  );
}
