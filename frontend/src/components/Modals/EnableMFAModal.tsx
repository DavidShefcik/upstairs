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

export default function EnableMFAModal(
  props: ReturnType<typeof useDisclosure>
) {
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
            Enable Multi Factor Authentication
          </Text>
        </ModalHeader>
        <ModalBody py="6" gap="4">
          <p>TODO</p>
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
          <Button colorScheme="brand" title="Next">
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
