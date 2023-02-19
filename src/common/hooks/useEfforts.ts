import { useState } from "react";
import { useIsomorphicLayoutEffect } from "~/common/hooks/useIsomorphicLayoutEffect";
import { database } from "~/database";

type ResolvedPromise = Awaited<ReturnType<typeof database.efforts.getAll>>;

export const useEfforts = () => {
  const [response, setResponse] = useState<ResolvedPromise>();

  useIsomorphicLayoutEffect(() => {
    const getEfforts = async () => {
      const response = await database.efforts.getAll();
      setResponse(response);
    };

    getEfforts();

    const realtimeSubscription = database.efforts.subscribeToChanges(() => {
      getEfforts();
    });

    realtimeSubscription.subscribe();

    return () => {
      realtimeSubscription.unsubscribe();
    };
  }, []);

  return {
    efforts: response?.data || [],
    meta: { error: response?.error, status: response?.statusText },
  };
};
