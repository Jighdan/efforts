import { useRouter } from "next/router";

import { Routes } from "~/enums/routes";
import { LayoutNoSession } from "~/layouts/NoSession";
import { SignUpView } from "~/views/sign-up";

export default function Page() {
  const router = useRouter();

  const onFooterAction = () => {
    router.push(Routes.SIGN_IN);
  };

  return (
    <LayoutNoSession
      footerAction={{
        label: "Already have an account?",
        children: "Already have an account?",
        onClick: onFooterAction,
      }}
    >
      <SignUpView />
    </LayoutNoSession>
  );
}
