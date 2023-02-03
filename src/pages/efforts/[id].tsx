import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { Layout } from "~/common/layouts/Main";
import { View, ViewProps } from "~/views/effort";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: Props) {
  return (
    <Layout>
      <View {...props} />
    </Layout>
  );
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<
  ViewProps,
  Params
> = async ({ params }) => {
  const id = params?.id;

  if (id) {
    return { props: { id: parseInt(id) } };
  }

  return { notFound: true };
};
