import { createContext, useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "~/common/hooks/useIsomorphicLayoutEffect";
import { database } from "~/database";
import { WithChildren } from "~/common/interfaces/with-children";
import { EffortDto } from "~/common/dto/effort";

interface State {
  efforts: EffortDto[];
}

const Context = createContext<State>({ efforts: [] });

export const useEffortsContext = () => useContext(Context);

type ResolvedPromise = Awaited<ReturnType<typeof database.efforts.getAll>>;

export const EffortsContextProvider = ({ children }: WithChildren) => {
  const [response, setResponse] = useState<ResolvedPromise>();

  const getEfforts = async () => {
    const response = await database.efforts.getAll();
    setResponse(response);
  };

  useIsomorphicLayoutEffect(() => {
    getEfforts();
    const realtimeSubscription = database.efforts.subscribeToChanges(() => {
      getEfforts();
    });
    realtimeSubscription.subscribe();

    return () => {
      realtimeSubscription.unsubscribe();
    };
  }, []);

  const values: State = {
    efforts: response?.data || [],
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
