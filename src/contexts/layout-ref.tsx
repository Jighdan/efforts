import { createContext, RefObject, useContext, useRef } from "react";

import { WithChildren } from "~/interfaces/with-children";

interface State {
  ref: RefObject<HTMLDivElement> | null;
}

const Context = createContext<State>({ ref: null });

export const useLayoutRefContext = () => useContext(Context);

export const LayoutRefContextProvider = ({ children }: WithChildren) => {
  const ref = useRef<HTMLDivElement>(null);

  return <Context.Provider value={{ ref }}>{children}</Context.Provider>;
};
