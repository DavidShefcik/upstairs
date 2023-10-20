import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { MdDevices, MdSecurity } from "react-icons/md";
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
    title: "Security",
    path: "/settings/security",
    icon: MdSecurity,
  },
  {
    title: "Devices",
    path: "/settings/devices",
    icon: MdDevices,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SettingsLayout() {
  const { isMobile, isLaptop, isDesktop, isUltrawide } = useDeviceSize();

  let contentWidth = "full";
  let marginRight = "4";
  if (isLaptop) {
    contentWidth = "90%";
    marginRight = "5%";
  }
  if (isDesktop) {
    contentWidth = "75%";
    marginRight = "-10%";
    marginRight = "-5%";
  }
  if (isUltrawide) {
    contentWidth = "60%";
    marginRight = "-30%";
  }

  return (
    <Flex
      w={contentWidth}
      flexDirection={isMobile ? "column" : "row"}
      py="4"
      gap={isMobile ? "2" : "6"}
      alignItems={isMobile ? "center" : "flex-start"}
      ml={isMobile ? "4" : "0"}
      mr={marginRight}
    >
      <LinkMenu items={SETTINGS_LINKS} />
      <Box py="1" w={contentWidth}>
        <Outlet />
      </Box>
    </Flex>
  );
}
