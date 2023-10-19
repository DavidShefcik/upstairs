import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { HiBuildingStorefront } from "react-icons/hi2";
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi";

import LinkMenu from "../components/LinkMenu";
import { ILinkMenuItem } from "../components/LinkMenu/types";
import { useNotifications } from "../context/NotificationState";
import MenuDivider from "../components/LinkMenu/LinkMenuDivider";
import Footer from "../components/Footer";
import { useSession } from "../context/AuthenticationState";
import { useDeviceSize } from "../hooks/useDeviceSize";

function MainLinks() {
  const { session } = useSession();
  const { hasUnreadNotifications } = useNotifications();

  const links = useMemo<ILinkMenuItem[]>(() => {
    return [
      session.user.neighborhoodId && {
        title: "Home",
        path: "/feed",
        icon: AiFillHome,
      },
      {
        title: "Notifications",
        path: "/notifications",
        icon: hasUnreadNotifications ? BiSolidBellRing : BiSolidBell,
        showBadge: hasUnreadNotifications,
      },
      {
        title: session.user.neighborhoodId
          ? "My Neighborhood"
          : "Join a Neighborhood",
        path: "/neighborhood",
        icon: HiBuildingStorefront,
      },
    ].filter(Boolean);
  }, [hasUnreadNotifications, session]);

  return <LinkMenu items={links} />;
}

export default function MainLayout() {
  const { isMobile } = useDeviceSize();

  if (isMobile) {
    return (
      <Flex w="full" flexDirection="column" px="6" py="4">
        <MainLinks />
        <Box flexGrow="1" pb="2" pt="4">
          <Outlet />
        </Box>
        <Flex
          w="full"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2"
        >
          <MenuDivider />
          <Footer />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex w="full" flexDirection="row" mx="32" py="4" gap="6">
      <Flex gap="2" flexDirection="column" position="sticky" top="0" left="0">
        <MainLinks />
        <MenuDivider />
        <Footer />
      </Flex>
      <Box py="1" flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
}
