import { useEfforts } from "~/common/hooks/useEfforts";
import { Layout } from "~/common/layouts/Main";
import { View } from "~/views/efforts";

export default function Page() {
  const { efforts } = useEfforts();

  return (
    <Layout>
      <View efforts={efforts} />
    </Layout>
  );
}
