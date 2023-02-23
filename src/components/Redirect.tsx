import { useRouter } from "next/router";
import { useEffect } from "react";
import { Routes } from "~/enums/routes";

export interface Props {
  to: Routes;
}

export const Redirect = ({ to }: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <></>;
};
