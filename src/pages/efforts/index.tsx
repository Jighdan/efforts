import { GuardLoggedInUser } from "~/guards/LoggedInUser";
import { useEfforts } from "~/hooks/useEfforts";
import { Layout } from "~/layouts/Main";
import { View } from "~/views/efforts";

export default function Page() {
  const { efforts } = useEfforts();

  return (
    <GuardLoggedInUser>
      <Layout>
        <View efforts={efforts} />
      </Layout>
    </GuardLoggedInUser>
  );
}
