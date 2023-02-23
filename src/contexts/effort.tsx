import { createContext, useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "~/hooks/useIsomorphicLayoutEffect";
import { database } from "~/database";
import { WithChildren } from "~/interfaces/with-children";
import { EffortDto, EffortWithMetaDto } from "~/dto/effort";

interface State {
  effort: EffortWithMetaDto | null;
}

const Context = createContext<State>({ effort: null });

export const useEffortContext = () => useContext(Context);

type ResolvedPromise = Awaited<ReturnType<typeof database.efforts.getById>>;

interface Props extends WithChildren {
  effortId: EffortDto["id"];
}

export const EffortContextProvider = ({ effortId, children }: Props) => {
  const [response, setResponse] = useState<ResolvedPromise>();

  useIsomorphicLayoutEffect(() => {
    const getEffort = async () => {
      const response = await database.efforts.getById(effortId);

      setResponse(response);
    };

    getEffort();
  }, [effortId]);

  const values: State = {
    effort: response?.data || null,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
