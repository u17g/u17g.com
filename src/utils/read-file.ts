import fs from "fs";
import path from "path";

const pwd = process.cwd();
const rootDir = path.resolve(pwd, "./");

/**
 *
 * readDirRecursive("@/docs/changelogs") -> recursively readdir u17g.com/docs/changelogs
 */
export function readDirRecursive(dir: string): string[] {
  const dirpath = dir.replace("@", rootDir);
  const paths = fs.readdirSync(dirpath);
  const result: string[] = [];
  for (const pathname of paths) {
    if (fs.statSync(path.join(dirpath, pathname)).isDirectory()) {
      result.push(...readDirRecursive(pathname).map((p) => `${pathname}/${p}`));
    } else {
      const filename = pathname.split(".").slice(0, -2).join(".");
      result.push(filename);
    }
  }
  return Array.from(new Set(result));
}

export function readFile(filepath: string): string {
  const realpath = filepath.replace("@", rootDir);
  return fs.readFileSync(realpath, "utf-8");
}
