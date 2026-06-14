import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const outDir = join(process.cwd(), ".output", "public");
const ssrEntryPath = join(process.cwd(), "node_modules", ".nitro", "vite", "services", "ssr", "index.js");
const siteUrl = process.env.SITE_URL || "https://chebrukov.ru";

const ssrModule = await import(pathToFileURL(ssrEntryPath).href);
const handler = ssrModule.default?.fetch ? ssrModule.default : ssrModule;

if (typeof handler.fetch !== "function") {
  throw new Error(`No fetch handler exported from ${ssrEntryPath}`);
}

const routes = [
  { urlPath: "/", filePath: "index.html" },
  { urlPath: "/sitemap.xml", filePath: "sitemap.xml" },
];

for (const route of routes) {
  const response = await handler.fetch(new Request(new URL(route.urlPath, siteUrl)), {}, {});
  if (!response.ok) {
    throw new Error(`Static export failed for ${route.urlPath}: ${response.status} ${response.statusText}`);
  }

  const target = join(outDir, route.filePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, await response.text());
  console.log(`Exported ${route.urlPath} -> ${route.filePath}`);
}