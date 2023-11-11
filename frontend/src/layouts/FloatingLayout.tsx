import { Navigate, Outlet } from "react-router-dom";
import BrandedFloatBox from "../components/BrandedFloatBox";
import { useSession } from "../context/AuthenticationState";
import { ReactNode } from "react";

interface Props {
  redirectAuthenticated?: boolean;
  children?: ReactNode;
  showHeader?: boolean;
}

export default function FloatingLayout({
  redirectAuthenticated = true,
  children,
  showHeader = true,
}: Props) {
  const { session } = useSession();

  if (redirectAuthenticated && session.isLoggedIn) {
    return <Navigate to="/feed" />;
  }

  return (
    <BrandedFloatBox showHeader={showHeader}>
      {children ?? <Outlet />}
    </BrandedFloatBox>
  );
}
