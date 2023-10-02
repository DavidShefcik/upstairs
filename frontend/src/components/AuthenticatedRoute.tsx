import { Navigate, Route, RouteProps } from "react-router-dom";
import { useSession } from "../context/AuthenticationState";
import { LoginState } from "../pages/Login";

export default function AuthenticatedRoute(props: RouteProps) {
  const { session, hasInitializedSession } = useSession();

  if (session.isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={
          {
            continueTo: props.path,
            needToLogin: true,
          } as LoginState
        }
      />
    );
  }

  return <Route {...props} />;
}
