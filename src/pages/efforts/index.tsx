import { Layout } from "~/common/layouts/Main";
import { View } from "~/views/efforts";
import { EffortsContextProvider } from "~/common/contexts/efforts";

export default function Page() {
  return (
    <Layout>
      <EffortsContextProvider>
        <View />
      </EffortsContextProvider>
    </Layout>
  );
}
