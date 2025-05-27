/**
 *
 * / -> index.html
 * /legal -> legal/index.html
 * /legal/terms -> legal/terms/index.html
 */
export function processPathname(pathname: string): string {
  // Remove leading and trailing slashes
  let path = pathname.trim();
  if (path.startsWith("/")) path = path.slice(1);
  if (path.endsWith("/")) path = path.slice(0, -1);
  if (path === "") {
    return "index.html";
  }
  return `${path}/index.html`;
}
