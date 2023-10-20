import { ReactNode, createContext, useContext, useMemo } from "react";

export interface IPromiseResultCacheContext {
  cache: Map<string, string>;
}

export const PromiseResultCacheContext =
  createContext<IPromiseResultCacheContext>({
    cache: new Map(),
  });

export function PromiseResultCacheProvider({
  children,
}: {
  children: ReactNode;
}) {
  const cache = useMemo(() => new Map<string, string>(), []);

  return (
    <PromiseResultCacheContext.Provider
      value={{
        cache,
      }}
    >
      {children}
    </PromiseResultCacheContext.Provider>
  );
}

export const usePromiseResultCache = () =>
  useContext(PromiseResultCacheContext);
