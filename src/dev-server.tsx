import { Hono } from "hono";
import { createI18nRoutes } from "./routes";
import fs from "fs/promises";
import { execSync } from "child_process";
import { serveStatic } from "hono/bun";
import path from "path";

const app = new Hono();

app.get("/styles.css", async (c) => {
  execSync("tailwindcss -i ./src/styles/main.css -o ./dist/styles.css --minify");
  return c.text(await fs.readFile("dist/styles.css", "utf-8"));
});

app.use(
  "/static/*",
  serveStatic({
    root: path.resolve(process.cwd(), "./src/static"),
    rewriteRequestPath: (path) => path.replace(/^\/static/, ""),
  }),
);

createI18nRoutes().forEach((route) => {
  app.get(route.path, (c) => {
    console.log("request:", route.path);
    return c.html(<route.render />);
  });
});

export default {
  port: 5175,
  fetch: app.fetch,
};
