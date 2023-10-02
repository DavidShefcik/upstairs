import { ReactNode } from "react";
import { AuthenticationStateProvider } from "./AuthenticationState";
import { NotificationStateProvider } from "./NotificationState";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <AuthenticationStateProvider>
      <NotificationStateProvider>{children}</NotificationStateProvider>
    </AuthenticationStateProvider>
  );
}
