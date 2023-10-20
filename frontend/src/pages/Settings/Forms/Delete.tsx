import { Text, useDisclosure } from "@chakra-ui/react";

import SettingsBox from "../../../components/Settings/SettingsBox";
import { useDeviceSize } from "../../../hooks/useDeviceSize";
import { FormEvent } from "react";
import DeleteAccountModal from "../../../components/Modals/DeleteAccountModal";

export default function SettingsAccountDeleteForm() {
  const { isMobile } = useDeviceSize();
  const deleteAccountDisclosure = useDisclosure();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    deleteAccountDisclosure.onOpen();
  };

  return (
    <>
      <SettingsBox
        title="Delete Account"
        isLoading={false}
        onSubmit={handleSubmit}
        onReset={() => {}}
        showFooter
        submitButtonColorScheme="red"
        submitButtonText="Delete Account"
      >
        <Text pb="7" pt="4" px={isMobile ? "0" : "6"}>
          This action is{" "}
          <Text as="span" color="red.400" fontWeight="bold">
            permanent
          </Text>
          . Your posts, comments, and profile will be deleted and you will not
          be able to log in. You will be able to create another account with
          your email address.
        </Text>
      </SettingsBox>
      <DeleteAccountModal {...deleteAccountDisclosure} />
    </>
  );
}
