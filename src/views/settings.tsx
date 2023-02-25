import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Button } from "~/components/Button";
import { Routes } from "~/enums/routes";

export const ViewSettings = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
	const router = useRouter();

  const onSignOutClick = async () => {
    try {
      await supabase.auth.signOut();
			router.push(Routes.SIGN_IN);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="max-h-full overflow-y-hidden flex flex-col gap-6">
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
              <Button label="Sign Out" onClick={onSignOutClick}>
                Sign Out
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
