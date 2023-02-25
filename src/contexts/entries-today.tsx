import { useUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useState } from "react";

import { database } from "~/database";
import { EffortEntryWithMetaDto } from "~/dto/effort-entry";
import { useIsomorphicLayoutEffect } from "~/hooks/useIsomorphicLayoutEffect";
import { WithChildren } from "~/interfaces/with-children";

interface State {
  entries: EffortEntryWithMetaDto[];
}

const Context = createContext<State>({ entries: [] });

export const useTodayEntriesContext = () => useContext(Context);

type ResolvedPromise = Awaited<
  ReturnType<typeof database.entries.getAllFromToday>
>;

export const TodayEntriesContextProvider = ({ children }: WithChildren) => {
  const user = useUser();
  const [response, setResponse] = useState<ResolvedPromise>();

  const getEntries = async () => {
    const response = await database.entries.getAllFromToday();

    setResponse(response);
  };

  useIsomorphicLayoutEffect(() => {
    if (user) {
      getEntries();
      const realtimeSubscription = database.entries.subscribeToChanges(
        getEntries,
        user.id
      );
      realtimeSubscription.subscribe();

      return () => {
        realtimeSubscription.unsubscribe();
      };
    }
  }, [user]);

  const values: State = {
    entries: response?.data || [],
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
