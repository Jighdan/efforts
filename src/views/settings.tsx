import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { Button } from "~/components/Button";
import { Routes } from "~/enums/routes";

export const ViewSettings = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const onSignOutClick = async () => {
    await supabase.auth.signOut();
    router.push(Routes.SIGN_IN);
  };

  return (
    <div className="flex max-h-full flex-col gap-6 overflow-y-hidden">
      <header>
        <h2 className="text-2xl">Settings</h2>
      </header>

      <div className="flex flex-col gap-4 overflow-y-auto">
        <div>
          <h3 className="text-xl">Your Info</h3>
          <ul>
            <li className="flex flex-col justify-between">
              <span className="text-silver">Email</span>
              <span>{user?.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl">Actions</h3>

          <ul>
            <li>
              <Button onClick={onSignOutClick}>Sign Out</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
