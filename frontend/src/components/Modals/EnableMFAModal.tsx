import { useState } from "react";
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

import MFACarousel, { AMOUNT_OF_SLIDES } from "../MFA/MFACarousel";

export default function EnableMFAModal(
  props: ReturnType<typeof useDisclosure>
) {
  const [canCloseModal, setCanCloseModal] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = () => {
    if (currentIndex < AMOUNT_OF_SLIDES) {
      setCurrentIndex((prev) => prev + 1);

      return;
    }

    props.onClose();
  };

  const handleCancel = () => {
    props.onClose();
  };
  const resetModal = () => {
    setCurrentIndex(0);
  };

  const buttonText = currentIndex === AMOUNT_OF_SLIDES - 1 ? "Done" : "Next";

  return (
    <Modal
      {...props}
      onCloseComplete={resetModal}
      closeOnEsc={canCloseModal}
      closeOnOverlayClick={canCloseModal}
    >
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
        <ModalBody py="4" gap="4">
          <MFACarousel
            currentIndex={currentIndex}
            canCloseModal={canCloseModal}
            setCurrentIndex={setCurrentIndex}
            setCanCloseModal={setCanCloseModal}
          />
        </ModalBody>
        <ModalFooter
          backgroundColor="gray.50"
          h="16"
          borderTopColor="gray.100"
          borderTopWidth="thin"
          gap="6"
        >
          <Button
            variant="link"
            color="gray.800"
            onClick={handleCancel}
            title="Cancel"
            isDisabled={!canCloseModal}
          >
            Cancel
          </Button>
          <Button
            w="16"
            colorScheme="brand"
            title={buttonText}
            onClick={handleSubmit}
            isLoading={!canCloseModal}
          >
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
