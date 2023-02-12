import { createContext, useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "~/common/hooks/useIsomorphicLayoutEffect";
import { database } from "~/database";
import { WithChildren } from "~/common/interfaces/with-children";
import { EffortEntryWithMetaDto } from "~/common/dto/effort-entry";

interface State {
  entries: EffortEntryWithMetaDto[];
}

const Context = createContext<State>({ entries: [] });

export const useTodayEntriesContext = () => useContext(Context);

type ResolvedPromise = Awaited<
  ReturnType<typeof database.entries.getAllFromToday>
>;

export const TodayEntriesContextProvider = ({ children }: WithChildren) => {
  const [response, setResponse] = useState<ResolvedPromise>();

  const getEntries = async () => {
    const response = await database.entries.getAllFromToday();

    setResponse(response);
  };

  useIsomorphicLayoutEffect(() => {
    getEntries();
    const realtimeSubscription = database.entries.subscribeToChanges(() => {
      getEntries();
    });
    realtimeSubscription.subscribe();

    return () => {
      realtimeSubscription.unsubscribe();
    };
  }, []);

  const values: State = {
    entries: response?.data || [],
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
