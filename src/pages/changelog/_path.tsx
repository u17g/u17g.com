import { Html, MainLayout, MaxWidthContainer } from "@/layout/main";
import { useCreateLocaledLink, useInlineTranslation, useLocaleCode } from "@/hooks/translation";
import { readFile } from "@/utils/read-file";
import { MarkdownRenderer } from "@/components/markdown";
import matter from "gray-matter";
import { z } from "zod";

export const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  timezone: z.enum(["JST", "UTC"]).optional(),
});

export default function Page({ path }: { path: string }) {
  const t = useInlineTranslation();
  const locale = useLocaleCode();
  const createLink = useCreateLocaledLink();
  const markdown = readFile(`${path}.${locale}.md`);
  const { data, content } = matter(markdown);
  const { success, data: parsedData, error } = schema.safeParse(data);
  if (!success) {
    throw new Error(`Invalid metadata: ${error}`);
  }
  const { title, description } = parsedData;
  return (
    <Html
      title={t({ en: `${title} - Changelog`, ja: `${title} - 沿革` })}
      description={description}
    >
      <MainLayout>
        <MaxWidthContainer>
          <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-2">
              <a href={createLink("/changelog")} class="hover:underline mt-16">
                {t({ en: "Changelog", ja: "沿革" })}
              </a>
              <h1 class="text-3xl font-bold leading-[1.2] mt-0">{title}</h1>
              <div class="flex flex-row gap-4">
                <div class="text-sm text-zinc-400">{parsedData.date.toDateString()}</div>
              </div>
            </div>
            <MarkdownRenderer markdown={content} />
          </div>
        </MaxWidthContainer>
      </MainLayout>
    </Html>
  );
}
