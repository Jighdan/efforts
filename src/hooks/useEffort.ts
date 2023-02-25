import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";

import { database } from "~/database";
import { EffortDto } from "~/dto/effort";
import { useIsomorphicLayoutEffect } from "~/hooks/useIsomorphicLayoutEffect";

type ResolvedPromise = Awaited<ReturnType<typeof database.efforts.getById>>;

export const useEffort = (effortId: EffortDto["id"]) => {
  const user = useUser();
  const [response, setResponse] = useState<ResolvedPromise>();

  useIsomorphicLayoutEffect(() => {
    const getEffort = async () => {
      const response = await database.efforts.getById(effortId);

      setResponse(response);
    };

    getEffort();

    if (user) {
      const realtimeSubscription = database.efforts.subscribeToEffortChanges(
        effortId,
        getEffort,
        user.id
      );
      realtimeSubscription.subscribe();

      return () => {
        realtimeSubscription.unsubscribe();
      };
    }
  }, [effortId, user]);

  return {
    effort: response?.data || undefined,
    meta: { error: response?.error, status: response?.statusText },
  };
};
