import { Navigate, RouteProps, useLocation } from "react-router-dom";
import { useSession } from "../context/AuthenticationState";
import { LoginState } from "../pages/Login";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NeighborhoodRoute(props: RouteProps) {
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

  if (!session.user.neighborhoodId) {
    return <Navigate to="/neighborhood/find" />;
  }

  return <AuthenticatedLayout />;
}
