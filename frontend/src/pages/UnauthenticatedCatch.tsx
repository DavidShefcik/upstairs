import { Navigate, useLocation } from "react-router-dom";
import { LoginState } from "./Login";

export default function UnauthenticatedCatchPage() {
  const location = useLocation();

  return (
    <Navigate
      to="/"
      state={
        {
          continueTo: [location.pathname, location.search].join(""),
        } as LoginState
      }
    />
  );
}
