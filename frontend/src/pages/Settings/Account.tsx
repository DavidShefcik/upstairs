import { Flex } from "@chakra-ui/react";

import SettingsAccountDetailsForm from "./Forms/Details";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import SettingsAccountDeleteForm from "./Forms/Delete";

export default function AccountSettings() {
  const { isMobile } = useDeviceSize();

  return (
    <Flex w="full" gap="3" flexDirection="column" px={isMobile ? "0" : "3"}>
      <SettingsAccountDetailsForm />
      <SettingsAccountDeleteForm />
    </Flex>
  );
}
