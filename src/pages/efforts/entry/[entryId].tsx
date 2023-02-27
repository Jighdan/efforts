import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ComponentProps } from "react";

import { database } from "~/database";
import { GuardLoggedInUser } from "~/guards/LoggedInUser";
import { Layout } from "~/layouts/Main";
import { ViewEffortEntry } from "~/views/effort-entry";

type Props = ComponentProps<typeof ViewEffortEntry>;

export default function Page({ entry }: Props) {
  return (
    <GuardLoggedInUser>
      <Layout>
        <ViewEffortEntry entry={entry} />
      </Layout>
    </GuardLoggedInUser>
  );
}

interface Params extends ParsedUrlQuery {
  entryId: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const id = params?.entryId;

  if (id) {
    const response = await database.entries.getById(parseInt(id));

    if (response.data) {
      return { props: { entry: response.data } };
    }

    return { notFound: true };
  }

  return { notFound: true };
};
