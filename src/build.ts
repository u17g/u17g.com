import { createI18nRoutes } from "./routes";
import { HtmlEscapedCallbackPhase, resolveCallback } from "hono/utils/html";
import fs from "fs/promises";
import { processPathname } from "./utils/pathname";
import path from "path";
import { config } from "./config";
import crypto from "crypto";
import { execSync } from "child_process";

main();

function digest(str: string) {
  return crypto.createHash("sha256").update(str).digest("hex").slice(0, 16);
}

async function generateSitemap(
  routes: { path: string; render: () => any; locale: { code: string; path: string } }[],
  outputDir: string,
) {
  const baseUrl = config.baseUrl;
  const currentDate = new Date().toISOString().split("T")[0];

  // Group routes by their base path (without locale)
  const routeGroups = new Map<string, { path: string; locale: string }[]>();

  routes.forEach((route) => {
    // Calculate base path by removing the locale prefix
    const basePath = route.locale.path
      ? route.path.replace(`/${route.locale.path}`, "") || "/"
      : route.path;

    if (!routeGroups.has(basePath)) {
      routeGroups.set(basePath, []);
    }
    routeGroups.get(basePath)!.push({
      path: route.path,
      locale: route.locale.code,
    });
  });

  const sitemapEntries = routes
    .map((route) => {
      const url = `${baseUrl}${route.path === "/" ? "" : route.path}${route.path.endsWith("/") ? "" : "/"}`;

      // Calculate base path for this route
      const basePath = route.locale.path
        ? route.path.replace(`/${route.locale.path}`, "") || "/"
        : route.path;

      // Get all language versions for this base path
      const alternates = routeGroups.get(basePath) || [];

      // Generate hreflang links
      const hreflangLinks = alternates
        .map((alt) => {
          const altUrl = `${baseUrl}${alt.path === "/" ? "" : alt.path}${alt.path.endsWith("/") ? "" : "/"}`;
          return `    <xhtml:link rel="alternate" hreflang="${alt.locale}" href="${altUrl}" />`;
        })
        .join("\n");

      // Determine if this is a home page (base path is "/")
      const isHomePage = basePath === "/";

      return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${isHomePage ? "1.0" : "0.8"}</priority>
${hreflangLinks}
  </url>`;
    })
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>`;

  const sitemapPath = path.resolve(outputDir, "sitemap.xml");
  await fs.writeFile(sitemapPath, sitemapXml);
  console.log("Generated sitemap.xml");
}

async function generateRobotsTxt(outputDir: string) {
  const baseUrl = config.baseUrl;

  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Block common bot paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /.well-known/
`;

  const robotsPath = path.resolve(outputDir, "robots.txt");
  await fs.writeFile(robotsPath, robotsTxt);
  console.log("Generated robots.txt");
}

async function main() {
  const outputDir = path.resolve(process.cwd(), "dist");
  await fs.rmdir(outputDir, { recursive: true }).catch(() => {});
  console.log("Cleaned dist directory");
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(path.resolve(outputDir, "static"), { recursive: true });
  await fs.cp(path.resolve(process.cwd(), "./src/static"), path.resolve(outputDir, "static"), {
    recursive: true,
  });
  console.log("Copied static files");

  execSync(`tailwindcss -i ./src/styles/main.css -o ${outputDir}/styles.css --minify`);
  console.log("Built styles.css");
  const cssDigest = digest(await fs.readFile(path.resolve(outputDir, "styles.css"), "utf-8"));
  console.log("style digest:", cssDigest);
  const cssFilename = `styles.${cssDigest}.css`;
  await fs.rename(path.resolve(outputDir, "styles.css"), path.resolve(outputDir, cssFilename));
  console.log(`Renamed styles.css to ${cssFilename}`);

  const routes = createI18nRoutes();
  for (const route of routes) {
    const rendered = await route.render();
    const html = await resolveCallback(rendered, HtmlEscapedCallbackPhase.Stringify, false, {});
    const compiledHtml = `<!DOCTYPE html>${html}`.replaceAll(
      `href="/styles.css"`,
      `href="/${cssFilename}"`,
    );
    const outputPath = path.resolve(outputDir, processPathname(route.path));
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, compiledHtml);
    console.log(`Built ${route.path}`);
  }

  // Generate sitemap.xml
  await generateSitemap(routes, outputDir);

  // Generate robots.txt
  await generateRobotsTxt(outputDir);
}
