import { ReactNode } from "react";
import { AuthenticationStateProvider } from "./AuthenticationState";
import { NotificationStateProvider } from "./NotificationState";
import { PromiseResultCacheProvider } from "./PromiseResultCache";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <PromiseResultCacheProvider>
      <AuthenticationStateProvider>
        <NotificationStateProvider>{children}</NotificationStateProvider>
      </AuthenticationStateProvider>
    </PromiseResultCacheProvider>
  );
}
