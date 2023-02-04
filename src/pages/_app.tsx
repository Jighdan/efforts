import type { AppProps } from "next/app";
import { StoreProvider } from "~/store";
import { LayoutRefContextProvider } from "~/common/contexts/layout-ref";

import "~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <LayoutRefContextProvider>
        <Component {...pageProps} />
      </LayoutRefContextProvider>
    </StoreProvider>
  );
}
