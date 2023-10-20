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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthenticationStateContext } from "../../context/AuthenticationState";
import { useNavigate } from "react-router-dom";
import { CognitoInstance } from "../../utils/Cognito";

export default function DeleteAccountModal(
  props: ReturnType<typeof useDisclosure>
) {
  const { logout } = useContext(AuthenticationStateContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await CognitoInstance.deleteUser();
      await logout();
    } catch {
      setIsLoading(false);
    }
    navigate("/login", {
      state: {
        from: "/settings/account#delete",
      },
    });
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
            Delete Account
          </Text>
        </ModalHeader>
        <ModalBody py="6">
          Are you sure you want to delete your account? This action is{" "}
          <Text as="span" color="red.400" fontWeight="bold">
            permanent
          </Text>{" "}
          and you will lose your profile, posts, and comments. You will be able
          to create a new account with your email address.
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
            title="Delete Account"
          >
            Delete Account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
