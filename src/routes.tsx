import { JSX } from "hono/jsx/jsx-runtime";
import { Locale, SUPPORTED_LOCALES } from "./locales";
import { I18nProvider } from "./hooks/translation";

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
