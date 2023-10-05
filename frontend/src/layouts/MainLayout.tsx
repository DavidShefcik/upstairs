import { Flex } from "@chakra-ui/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ReactNode, useEffect } from "react";

import Header from "../components/Header";
import { useSession } from "../context/AuthenticationState";
import { LoginState } from "../pages/Login";

interface Props {
  children?: ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { session } = useSession();
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.backgroundColor = "#EDF2F7";
  }, []);

  if (!session.isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={
          {
            continueTo: pathname,
          } as LoginState
        }
      />
    );
  }

  return (
    <Flex
      flexDirection="column"
      height="100%"
      width="100%"
      backgroundColor="gray.100"
    >
      <Header />
      <Flex flexGrow={1} height="auto" justifyContent="center">
        {children ?? <Outlet />}
      </Flex>
    </Flex>
  );
}
