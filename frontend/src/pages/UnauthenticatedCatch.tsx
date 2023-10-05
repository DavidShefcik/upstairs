import { Navigate, useLocation } from "react-router-dom";
import { LoginState } from "./Login";

export default function UnauthenticatedCatchPage() {
  const location = useLocation();

  return (
    <Navigate
      to="/"
      state={
        {
          from: [location.pathname, location.search].join(""),
          needToLogin: true,
        } as LoginState
      }
    />
  );
}
