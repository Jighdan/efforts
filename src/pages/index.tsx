import { Layout } from "~/layouts/Main";
import { View } from "~/views/home";
import { TodayEntriesContextProvider } from "~/contexts/entries-today";

export default function Page() {
  return (
    <Layout>
      <TodayEntriesContextProvider>
        <View />
      </TodayEntriesContextProvider>
    </Layout>
  );
}
