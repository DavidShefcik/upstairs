import { Flex } from "@chakra-ui/react";

import SettingsAccountDetailsForm from "./Forms/Details";
import { useDeviceSize } from "../../hooks/useDeviceSize";

export default function AccountSettings() {
  const { isMobile } = useDeviceSize();

  return (
    <Flex w="full" gap="3" flexDirection="column" px={isMobile ? "0" : "3"}>
      <SettingsAccountDetailsForm />
    </Flex>
  );
}
