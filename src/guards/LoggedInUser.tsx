import { useUser } from "@supabase/auth-helpers-react";
import { Redirect } from "~/components/Redirect";
import { PropsWithChildren } from "react";
import { Routes } from "~/enums/routes";

interface Props extends PropsWithChildren {
  fallbackRoute?: Routes;
}

export const GuardLoggedInUser = ({
  fallbackRoute = Routes.SIGN_IN,
  children,
}: Props) => {
  const user = useUser();

  if (!!user) {
    return <>{children}</>;
  }

  return <Redirect to={fallbackRoute} />;
};
