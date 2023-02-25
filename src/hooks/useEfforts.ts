import { useState } from "react";
import { useIsomorphicLayoutEffect } from "~/hooks/useIsomorphicLayoutEffect";
import { database } from "~/database";
import { useUser } from "@supabase/auth-helpers-react";

type ResolvedPromise = Awaited<ReturnType<typeof database.efforts.getAll>>;

export const useEfforts = () => {
  const user = useUser();
  const [response, setResponse] = useState<ResolvedPromise>();

  useIsomorphicLayoutEffect(() => {
    if (user) {
      const getEfforts = async () => {
        const response = await database.efforts.getAll();
        setResponse(response);
      };

      getEfforts();

      const realtimeSubscription = database.efforts.subscribeToChanges(getEfforts, user.id);

      realtimeSubscription.subscribe();

      return () => {
        realtimeSubscription.unsubscribe();
      };
    }
  }, [user]);

  return {
    efforts: response?.data || [],
    meta: { error: response?.error, status: response?.statusText },
  };
};
