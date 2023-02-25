import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { EffortContextProvider } from "~/contexts/effort";
import { EffortDto } from "~/dto/effort";
import { GuardLoggedInUser } from "~/guards/LoggedInUser";
import { Layout } from "~/layouts/Main";
import { View } from "~/views/effort";

interface Props {
  effortId: EffortDto["id"];
}

export default function Page({ effortId }: Props) {
  return (
    <GuardLoggedInUser>
      <Layout>
        <EffortContextProvider effortId={effortId}>
          <View />
        </EffortContextProvider>
      </Layout>
    </GuardLoggedInUser>
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
