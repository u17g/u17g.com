import { useCreateLocaledLink, useInlineTranslation } from "@/hooks/translation";
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
    description: {
      en: "Experienced in business development, product management, and enterprise scaling at Recruit, Plaid, and IVRy. Strengthening business strategy for Turnint AI.",
      ja: "リクルート、プレイド、IVRyにて事業開発・プロダクトマネジメント・エンタープライズ領域の事業設計を推進。Turnint AIの事業戦略強化を担当。",
    },
  },
];

export default function Page() {
  const t = useInlineTranslation();
  const createLink = useCreateLocaledLink();
  return (
    <Html title={t({ en: "Team - Unbounded Pioneering", ja: "チーム - Unbounded Pioneering" })}>
      <MainLayout>
        <MaxWidthContainer class="flex flex-col gap-8 items-start justify-center">
          <div class="flex flex-col gap-2 my-16">
            <a href={createLink("/")} class="hover:underline">
              {t({ en: "Unbounded Pioneering", ja: "Unbounded Pioneering" })}
            </a>
            <h1 class="text-3xl font-bold leading-[1.2] mt-0">
              {t({ en: "Team", ja: "チーム" })}
            </h1>
          </div>
          <div class="flex flex-col gap-8 w-full">
            {members.map((member) => (
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-md bg-zinc-700 overflow-hidden flex-shrink-0 mt-0.5">
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
                  {member.description && (
                    <p class="text-sm text-zinc-400 mt-1">{t(member.description)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </MaxWidthContainer>
      </MainLayout>
    </Html>
  );
}
