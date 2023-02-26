import "~/styles/globals.css";

import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";

import { LayoutRefContextProvider } from "~/contexts/layout-ref";
import { TooltipProvider } from "~/contexts/tooltip";
import { client } from "~/database/client";

type Props = AppProps<{
  session: Session;
}>;

const App = ({ Component, pageProps: { session, ...pageProps } }: Props) => {
  return (
    <SessionContextProvider supabaseClient={client} initialSession={session}>
      <LayoutRefContextProvider>
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>
      </LayoutRefContextProvider>
    </SessionContextProvider>
  );
};

export default App;
