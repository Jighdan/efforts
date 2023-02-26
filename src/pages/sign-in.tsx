import { useRouter } from "next/router";

import { Routes } from "~/enums/routes";
import { LayoutNoSession } from "~/layouts/NoSession";
import { ViewSignIn } from "~/views/sign-in";

export default function Page() {
  const router = useRouter();

  const onFooterAction = () => {
    router.push(Routes.SIGN_UP);
  };

  return (
    <LayoutNoSession
      footerAction={{
        children: "Don't have an account?",
        onClick: onFooterAction,
      }}
    >
      <ViewSignIn />
    </LayoutNoSession>
  );
}
