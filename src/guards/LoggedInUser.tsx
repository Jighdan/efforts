import { useSupabaseClient } from "@supabase/auth-helpers-react";
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
  const supabase = useSupabaseClient();

  if (!supabase.auth.getSession()) {
    return <Redirect to={fallbackRoute} />;
  }

  return <>{children}</>;
};
