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
import { useContext } from "react";
import { AuthenticationStateContext } from "../../context/AuthenticationState";
import { useNavigate } from "react-router-dom";

export default function LogoutModal(props: ReturnType<typeof useDisclosure>) {
  const { logout } = useContext(AuthenticationStateContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Modal {...props}>
      <ModalOverlay justifyContent="center" alignItems="center" />
      <ModalContent
        containerProps={{
          alignItems: "center",
        }}
        overflow="hidden"
      >
        <ModalHeader borderBottomColor="gray.100" borderBottomWidth="thin">
          <Text fontWeight="bold" fontStyle="italic">
            Logout
          </Text>
        </ModalHeader>
        <ModalBody py="6">Are you sure you want to logout?</ModalBody>
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
          <Button colorScheme="red" onClick={handleSubmit}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
