import { Flex } from "@chakra-ui/react";

import SettingsAccountDetailsForm from "./Forms/Details";
import SettingsPasswordForm from "./Forms/Password";
import { useDeviceSize } from "../../hooks/useDeviceSize";

export default function AccountSettings() {
  const { isMobile, isLaptop, isDesktop, isUltrawide } = useDeviceSize();

  let width = "full";
  if (isLaptop) {
    width = "80%";
  }
  if (isDesktop) {
    width = "60%";
  }
  if (isUltrawide) {
    width = "40%";
  }

  return (
    <Flex w={width} gap="3" flexDirection="column" px={isMobile ? "0" : "3"}>
      <SettingsAccountDetailsForm />
      <SettingsPasswordForm />
    </Flex>
  );
}
