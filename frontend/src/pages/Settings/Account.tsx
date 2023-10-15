import { Flex } from "@chakra-ui/react";

import SettingsAccountDetailsForm from "./Forms/Details";
import SettingsPasswordForm from "./Forms/Password";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function AccountSettings() {
  const isMobile = useIsMobile();

  return (
    <Flex w="full" gap="3" flexDirection="column" px={isMobile ? "0" : "3"}>
      <SettingsAccountDetailsForm />
      <SettingsPasswordForm />
    </Flex>
  );
}
