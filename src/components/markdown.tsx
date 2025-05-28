import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeClassNames from "rehype-class-names";
import { raw } from "hono/html";
import { cn } from "@/utils/cn";

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  const result = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeClassNames, {
      h1: "text-3xl font-bold mt-12 mb-6",
      h2: "text-2xl font-bold mt-12 mb-6",
      "h3,h4,h5,h6": "text-xl font-bold mt-12 mb-6",
      p: "py-2",
      ul: "list-disc pl-4 pr-4",
      ol: "list-decimal pl-4 pr-4",
      li: "py-1 pl-1",
      blockquote: "border-l-2 border-gray-300 pl-6 my-4 text-gray-500",
      a: "text-blue-400 underline",
    })
    .use(rehypeStringify)
    .processSync(markdown);
  return <div class={cn("pt-8 pb-16")}>{raw(String(result))}</div>;
}
