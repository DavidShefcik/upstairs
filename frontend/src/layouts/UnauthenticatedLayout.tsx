import { Navigate, Outlet } from "react-router-dom";
import BrandedFloatBox from "../components/BrandedFloatBox";
import { useSession } from "../context/AuthenticationState";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function UnauthenticatedLayout({ children }: Props) {
  const { session } = useSession();

  if (session.isLoggedIn) {
    return <Navigate to="/feed" />;
  }

  return <BrandedFloatBox>{children ?? <Outlet />}</BrandedFloatBox>;
}
