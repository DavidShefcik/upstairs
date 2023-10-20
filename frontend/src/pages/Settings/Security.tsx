import { Flex } from "@chakra-ui/react";

import { useDeviceSize } from "../../hooks/useDeviceSize";
import SettingsPasswordForm from "./Forms/Password";

export default function AccountSettings() {
  const { isMobile } = useDeviceSize();

  return (
    <Flex w="full" gap="3" flexDirection="column" px={isMobile ? "0" : "3"}>
      <SettingsPasswordForm />
    </Flex>
  );
}
