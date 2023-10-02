import { Navigate, RouteProps } from "react-router-dom";
import { useSession } from "../context/AuthenticationState";

export default function UnauthenticatedRoute({ children }: RouteProps) {
  const { session } = useSession();

  if (session.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
