import { JSX } from "hono/jsx/jsx-runtime";
import { Locale, SUPPORTED_LOCALES } from "./locales";
import { I18nProvider } from "./hooks/translation";
import { readDirRecursive } from "./utils/read-file";

type Route = {
  path: string;
  render: () => JSX.Element;
};

type RouteWithLocale = Route & {
  locale: Locale;
};

const lazy = (imported: Promise<{ default: () => JSX.Element }>) => async () => {
  const { default: Component } = await imported;
  return <Component />;
};

const createRouteDefs: () => Route[] = () => {
  return [
    {
      path: "/",
      render: lazy(import("./pages/home")),
    },
    {
      path: "/changelog",
      render: lazy(import("./pages/changelog/index")),
    },
    ...readDirRecursive("@/docs/changelog").map((path) => {
      return {
        path: `/changelog/${path}`,
        render: async () => {
          const imported = await import(`./pages/changelog/_path`);
          const { default: Page } = imported;
          return <Page path={`@/docs/changelog/${path}`} />;
        },
      };
    }),
  ];
};

export const createI18nRoutes = (): RouteWithLocale[] => {
  const routeDefs = createRouteDefs();
  const result: RouteWithLocale[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const routeDef of routeDefs) {
      result.push({
        locale,
        path: `${locale.path ? `/${locale.path}` : ""}${routeDef.path}`,
        render: () => {
          return (
            <I18nProvider value={{ code: locale.code }}>
              <routeDef.render />
            </I18nProvider>
          );
        },
      });
    }
  }
  return result;
};
