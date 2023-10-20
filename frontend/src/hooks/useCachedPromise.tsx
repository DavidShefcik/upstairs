import { useEffect, useState } from "react";
import { usePromiseResultCache } from "../context/PromiseResultCache";

interface ReturnType<R> {
  isLoading: boolean;
  data: R | undefined;
  error: Error | undefined;
  updateValue(data: R): void;
}

export default function useCachedPromise<R, V = undefined>(
  cacheKey: string,
  fn: (variables: V) => Promise<R>,
  variables: V = undefined
): ReturnType<R> {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<R>();
  const { cache } = usePromiseResultCache();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const result = cache.get(cacheKey);

      if (result) {
        try {
          const parsedData = JSON.parse(result);

          setData(parsedData);
        } catch (err) {
          setError(err);
        }

        setIsLoading(false);
        return;
      }

      try {
        const result = await fn(variables);
        const stringifiedResult = JSON.stringify(result);
        cache.set(cacheKey, stringifiedResult);
        setData(result);
      } catch (err) {
        setError(err);
      }

      setIsLoading(false);
    })();
  }, []);

  const updateValue = (newValue: R) => {
    try {
      const stringifiedNewValue = JSON.stringify(newValue);
      cache.set(cacheKey, stringifiedNewValue);
      setData(newValue);
    } catch (err) {
      setError(err);
    }
  };

  return {
    isLoading,
    error,
    data,
    updateValue,
  };
}
