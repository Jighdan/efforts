import type { AppProps } from "next/app";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { LayoutRefContextProvider } from "~/common/contexts/layout-ref";
import { client } from "~/database/client";

import "~/styles/globals.css";

type Props = AppProps<{
  session: Session;
}>;

const App = ({ Component, pageProps: { session, ...pageProps } }: Props) => {
  return (
    <SessionContextProvider supabaseClient={client} initialSession={session}>
      <LayoutRefContextProvider>
        <Component {...pageProps} />
      </LayoutRefContextProvider>
    </SessionContextProvider>
  );
};

export default App;
