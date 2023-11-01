import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  ModalFooter,
  PinInput,
  Text,
} from "@chakra-ui/react";
import { FormikErrors, FormikHelpers, useFormik } from "formik";

import PinInputField from "../PinInputField";

interface Props {
  setCanCloseModal(value: boolean): void;
}

interface MFAConfirmCodeFields {
  code: string;
}

export default function MFAConfirmCode({ setCanCloseModal }: Props) {
  const validate = (values: MFAConfirmCodeFields) => {
    const errors: FormikErrors<MFAConfirmCodeFields> = {};

    if (values.code.trim().length < 6) {
      errors.code = "Code is required!";
    }

    return errors;
  };
  const onSubmit = (
    values: MFAConfirmCodeFields,
    helpers: FormikHelpers<MFAConfirmCodeFields>
  ) => {
    setCanCloseModal(false);
    setCanCloseModal(true);
  };
  const handleCancel = () => {};
  const handleSubmit = () => {};

  const form = useFormik<MFAConfirmCodeFields>({
    initialValues: {
      code: "",
    },
    onSubmit,
    validate,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <Box display="inline">
        <Flex flexDirection="column" gap="2" alignItems="flex-start">
          <Text
            w="full"
            textAlign="left"
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Confirm Code
          </Text>
          <Text w="full" textAlign="left" color="gray.700" fontWeight="medium">
            Enter the 6-digit verification code generated
          </Text>
          <form onSubmit={form.handleSubmit}>
            <FormControl
              isInvalid={!!form.errors.code}
              left="1"
              bottom="1"
              pt="2"
            >
              <HStack w="full" justifyContent="center">
                <PinInput
                  {...form.getFieldProps("code")}
                  value={form.values.code}
                  onChange={(value) => {
                    form.getFieldProps("code").onChange({
                      target: {
                        name: "code",
                        value,
                      },
                    });
                  }}
                >
                  {new Array(6).fill(0).map((_, i) => (
                    <PinInputField key={i} />
                  ))}
                </PinInput>
              </HStack>
              <FormErrorMessage>{form.errors.code}</FormErrorMessage>
            </FormControl>
          </form>
        </Flex>
      </Box>
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
          title="Done"
          onClick={handleSubmit}
          isLoading={!canCloseModal}
        >
          Done
        </Button>
      </ModalFooter>
    </>
  );
}
