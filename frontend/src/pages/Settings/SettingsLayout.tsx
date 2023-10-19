import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { MdDevices } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import LinkMenu from "../../components/LinkMenu";
import { ILinkMenuLink } from "../../components/LinkMenu/types";
import { useDeviceSize } from "../../hooks/useDeviceSize";

const SETTINGS_LINKS: ILinkMenuLink[] = [
  {
    title: "Account",
    path: "/settings/account",
    icon: BsPersonFill,
  },
  {
    title: "Devices",
    path: "/settings/devices",
    icon: MdDevices,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SettingsLayout() {
  const { isMobile, isDesktop, isUltrawide } = useDeviceSize();

  let margin = "4";
  if (isDesktop) {
    margin = "32";
  }
  if (isUltrawide) {
    margin = "48";
  }

  return (
    <Flex
      w="full"
      flexDirection={isMobile ? "column" : "row"}
      mx={margin}
      py="4"
      gap={isMobile ? "2" : "6"}
    >
      <LinkMenu items={SETTINGS_LINKS} />
      <Box py="1" flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
}
