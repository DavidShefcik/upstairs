import { useEffect } from "react";
import { useSession } from "../context/AuthenticationState";

export default function InitAuth() {
  const { initializeSession } = useSession();

  useEffect(() => {
    initializeSession();
  }, []);

  return null;
}
