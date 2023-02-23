import { Layout } from "~/common/layouts/Main";
import { View } from "~/views/home";
import { TodayEntriesContextProvider } from "~/common/contexts/entries-today";

export default function Page() {
  return (
    <Layout>
      <TodayEntriesContextProvider>
        <View />
      </TodayEntriesContextProvider>
    </Layout>
  );
}
