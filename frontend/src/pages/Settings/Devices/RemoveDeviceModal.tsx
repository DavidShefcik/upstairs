import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import { AuthenticationStateContext } from "../../../context/AuthenticationState";
import { useNavigate } from "react-router-dom";
import { CognitoInstance, DeviceSession } from "../../../utils/Cognito";

export default function RemoveDeviceModal({
  device,
  onSuccess,
  ...props
}: ReturnType<typeof useDisclosure> & {
  device: DeviceSession | null;
  onSuccess(device: DeviceSession): void;
}) {
  const { logout } = useContext(AuthenticationStateContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (device.isCurrentSession) {
      try {
        await logout();
      } catch (error) {
        console.error(error);
      }

      props.onClose();
      navigate("/login");

      return;
    }

    try {
      await CognitoInstance.revokeSession(device.deviceKey);
      onSuccess(device);
      props.onClose();
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Modal {...props}>
      <ModalOverlay justifyContent="center" alignItems="center" />
      <ModalContent
        containerProps={{
          alignItems: "center",
        }}
        overflow="hidden"
        mx="3"
      >
        <ModalHeader borderBottomColor="gray.100" borderBottomWidth="thin">
          <Text fontWeight="bold" fontStyle="italic">
            Remove Device
          </Text>
        </ModalHeader>
        <ModalBody py="6" gap="4">
          {device?.isCurrentSession && (
            <Flex w="full" justifyContent="center" alignItems="center" pb="4">
              <Flex
                borderWidth="medium"
                borderRadius="md"
                overflow="hidden"
                p="2"
                w="full"
                flexDirection="column"
                gap="1"
                backgroundColor="red.400"
                borderColor="red.500"
              >
                <Text
                  fontWeight="bold"
                  fontStyle="italic"
                  fontSize="md"
                  color="black"
                >
                  You're removing the current session
                </Text>
                <Text color="gray.800" fontSize="sm" fontWeight="semibold">
                  This will log you out
                </Text>
              </Flex>
            </Flex>
          )}
          Are you sure you want to remove this device?
        </ModalBody>
        <ModalFooter
          backgroundColor="gray.50"
          h="16"
          borderTopColor="gray.100"
          borderTopWidth="thin"
          gap="6"
        >
          <Button variant="link" color="gray.800" onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={handleSubmit}
            isLoading={isLoading}
            title="Remove"
          >
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
