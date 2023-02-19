import { Layout } from "~/common/layouts/Main";
import { View } from "~/views/home";
import { EffortsContextProvider } from "~/common/contexts/efforts";
import { TodayEntriesContextProvider } from "~/common/contexts/entries-today";

export default function Page() {
  return (
    <Layout>
      <EffortsContextProvider>
        <TodayEntriesContextProvider>
          <View />
        </TodayEntriesContextProvider>
      </EffortsContextProvider>
    </Layout>
  );
}
