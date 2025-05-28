import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import path from "path";

const app = new Hono();

app.use(
  "/*",
  serveStatic({
    root: path.resolve(process.cwd(), "./dist"),
    rewriteRequestPath: (path) => path.replace(/^\/dist/, ""),
  }),
);

export default {
  port: 5176,
  fetch: app.fetch,
};
