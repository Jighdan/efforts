import { TodayEntriesContextProvider } from "~/contexts/entries-today";
import { GuardLoggedInUser } from "~/guards/LoggedInUser";
import { Layout } from "~/layouts/Main";
import { View } from "~/views/home";

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
