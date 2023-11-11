import { Navigate, RouteProps, useLocation } from "react-router-dom";
import { useSession } from "../context/AuthenticationState";
import { LoginState } from "../pages/Login";
import FloatingLayout from "../layouts/FloatingLayout";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NoNeighborhoodRoute(props: RouteProps) {
  const { session } = useSession();
  const location = useLocation();

  if (!session.isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={
          {
            from: location.pathname,
            needToLogin: true,
          } as LoginState
        }
        replace
      />
    );
  }

  if (session.user.neighborhoodId) {
    return <Navigate to="/feed" />;
  }

  return <FloatingLayout showHeader={false} redirectAuthenticated={false} />;
}
