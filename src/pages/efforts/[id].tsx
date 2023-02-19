import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Layout } from "~/common/layouts/Main";
import { View } from "~/views/effort";
import { EffortContextProvider } from "~/common/contexts/effort";
import { EffortDto } from "~/common/dto/effort";

interface Props {
  effortId: EffortDto["id"];
}

export default function Page({ effortId }: Props) {
  return (
    <Layout>
      <EffortContextProvider effortId={effortId}>
        <View />
      </EffortContextProvider>
    </Layout>
  );
}
interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const id = params?.id;

  if (id) {
    return { props: { effortId: parseInt(id) } };
  }

  return { notFound: true };
};
