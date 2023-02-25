import { GuardLoggedInUser } from "~/guards/LoggedInUser";
import { Layout } from "~/layouts/Main";
import { ViewSettings } from "~/views/settings";

export default function Page() {
  return (
    <GuardLoggedInUser>
      <Layout>
        <ViewSettings />
      </Layout>
    </GuardLoggedInUser>
  );
}
