import { Navigate, Outlet } from "react-router-dom";
import BrandedFloatBox from "../components/BrandedFloatBox";
import { useSession } from "../context/AuthenticationState";

interface Props {
  requireUnauthenticated?: boolean;
}

export default function UnauthenticatedLayout({
  requireUnauthenticated = true,
}: Props) {
  const { session } = useSession();

  if (requireUnauthenticated && session.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <BrandedFloatBox>
      <Outlet />
    </BrandedFloatBox>
  );
}
