import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import LinkMenu from "../components/LinkMenu";
import { ILinkMenuItem } from "../components/LinkMenu/types";
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi";
import { HiBuildingStorefront } from "react-icons/hi2";
import { useMemo } from "react";
import { useNotifications } from "../context/NotificationState";
import MenuDivider from "../components/LinkMenu/LinkMenuDivider";
import Footer from "../components/Footer";

function MainLinks() {
  const { hasUnreadNotifications } = useNotifications();

  const links = useMemo<ILinkMenuItem[]>(() => {
    return [
      {
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
        title: "My Neighborhood",
        path: "/neighborhood",
        icon: HiBuildingStorefront,
      },
    ];
  }, [hasUnreadNotifications]);

  return <LinkMenu items={links} />;
}

export default function MainLayout() {
  return (
    <Flex w="full" flexDirection="row" mx="32" py="4" gap="6">
      <Flex gap="2" flexDirection="column">
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
