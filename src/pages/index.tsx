import { Layout } from "~/layouts/Main";
import { View } from "~/views/home";
import { TodayEntriesContextProvider } from "~/contexts/entries-today";
import { GuardLoggedInUser } from "~/guards/LoggedInUser";

export default function Page() {
  return (
    <GuardLoggedInUser>
      <Layout>
        <TodayEntriesContextProvider>
          <View />
        </TodayEntriesContextProvider>
      </Layout>
    </GuardLoggedInUser>
  );
}
