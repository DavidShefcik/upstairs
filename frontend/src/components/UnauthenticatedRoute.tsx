import { Navigate, RouteProps } from "react-router-dom";
import { useSession } from "../context/AuthenticationState";
import UnauthenticatedLayout from "../layouts/UnauthenticatedLayout";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UnauthenticatedRoute(props: RouteProps) {
  const { session } = useSession();

  if (session.isLoggedIn) {
    return <Navigate to="/feed" replace />;
  }

  return <UnauthenticatedLayout />;
}
