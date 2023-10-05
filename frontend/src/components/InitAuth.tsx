import { ReactNode, useEffect } from "react";
import { useSession } from "../context/AuthenticationState";

export default function InitAuth({ children }: { children: ReactNode }) {
  const { initializeSession, hasInitializedSession } = useSession();

  useEffect(() => {
    initializeSession();
  }, []);

  if (!hasInitializedSession) {
    return null;
  }

  return <>{children}</>;
}
