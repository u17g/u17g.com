import { Html, MainLayout, MaxWidthContainer } from "@/layout/main";
import { useCreateLocaledLink, useLocaleCode } from "@/hooks/translation";
import { readDirRecursive, readFile } from "@/utils/read-file";
import { MarkdownRenderer } from "@/components/markdown";
import matter from "gray-matter";
import { schema } from "./_path";
import { useInlineTranslation } from "@/hooks/translation";

export default function Page() {
  const t = useInlineTranslation();
  const locale = useLocaleCode();
  const createLink = useCreateLocaledLink();
  const files = readDirRecursive("@/docs/changelog");
  const changelogs = files.map((file) => {
    const markdown = readFile(`@/docs/changelog/${file}.${locale}.md`);
    const { data, content } = matter(markdown);
    const { success, data: parsedData, error } = schema.safeParse(data);
    if (!success) {
      throw new Error(`Invalid metadata: ${error}`);
    }
    return {
      title: parsedData.title,
      description: parsedData.description,
      date: parsedData.date,
      content,
    };
  });
  changelogs.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return (
    <Html title={t({ en: "Changelog", ja: "沿革" })}>
      <MainLayout>
        <MaxWidthContainer>
          <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-2 my-16">
              <a href={createLink("/")} class="hover:underline">
                {t({ en: "Unbounded Pioneering", ja: "Unbounded Pioneering" })}
              </a>
              <h1 class="text-3xl font-bold leading-[1.2] mt-0">
                {t({ en: "Changelog", ja: "沿革" })}
              </h1>
            </div>
            {changelogs.map((changelog, index) => (
              <div key={changelog.title} class="flex flex-col gap-2">
                <h2 class="text-2xl font-bold leading-[1.2] hover:underline">
                  <a href={createLink(`/changelog/${changelog.title}`)}>{changelog.title}</a>
                </h2>
                <div class="flex flex-row gap-4">
                  <div class="text-sm text-zinc-400">{changelog.date.toDateString()}</div>
                </div>
                <MarkdownRenderer markdown={changelog.content} />
                {index !== changelogs.length - 1 && <hr class="my-4 border-zinc-600" />}
              </div>
            ))}
          </div>
        </MaxWidthContainer>
      </MainLayout>
    </Html>
  );
}
