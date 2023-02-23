import { LayoutNoSession } from "~/layouts/NoSession";
import { useRouter } from "next/router";
import { Routes } from "~/enums/routes";
import { ViewSignIn } from "~/views/sign-in";

export default function Page() {
  const router = useRouter();

  const onFooterAction = () => {
    router.push(Routes.SIGN_UP);
  };

  return (
    <LayoutNoSession
      footerAction={{
        label: "Don't have an account?",
        children: "Sign Up",
        onClick: onFooterAction,
      }}
    >
      <ViewSignIn />
    </LayoutNoSession>
  );
}
