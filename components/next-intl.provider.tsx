import type { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";

interface NextIntlProviderProps {
  children: ReactNode;
}

export function NextIntlProvider({ children }: NextIntlProviderProps) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
