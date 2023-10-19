import { FormikErrors, FormikHelpers, useFormik } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
} from "@chakra-ui/react";

import SettingsBox from "../../../components/Settings/SettingsBox";
import Input from "../../../components/Input";
import { CognitoInstance } from "../../../utils/Cognito";
import { useDeviceSize } from "../../../hooks/useDeviceSize";
import { useSession } from "../../../context/AuthenticationState";

interface AccountDetailsFormFields {
  firstName: string;
  lastName: string;
  email: string;
}

export default function SettingsAccountDetailsForm() {
  const { isMobile } = useDeviceSize();
  const { session, updateUser } = useSession();

  const validate = ({
    email,
    firstName,
    lastName,
  }: AccountDetailsFormFields) => {
    const errors: FormikErrors<AccountDetailsFormFields> = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required!";
    }
    if (!lastName.trim()) {
      errors.lastName = "Last name is required!";
    }
    if (!email.trim()) {
      errors.email = "Email is required!";
    }

    return errors;
  };
  const handleSubmit = async (
    values: AccountDetailsFormFields,
    formikHelpers: FormikHelpers<AccountDetailsFormFields>
  ) => {
    const errors: FormikErrors<AccountDetailsFormFields> = {};
    try {
      const updatedFields = await CognitoInstance.updateAttributes(values);
      updateUser(updatedFields);
    } catch (error) {
      console.error(error);

      switch (error.name) {
        default:
          errors.firstName = "Something unexpected happened";
          errors.lastName = "Something unexpected happened";
          errors.email = "Something unexpected happened";
      }
    }

    formikHelpers.setSubmitting(false);
    formikHelpers.setErrors(errors);
  };
  const form = useFormik<AccountDetailsFormFields>({
    initialValues: {
      email: session.user.email,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
    },
    onSubmit: handleSubmit,
    validate,
    validateOnBlur: false,
    validateOnChange: false,
  });
  const handleReset = () => {
    form.resetForm();
  };

  return (
    <SettingsBox
      title="Account Details"
      isLoading={form.isSubmitting}
      onSubmit={form.handleSubmit}
      onReset={handleReset}
    >
      <Flex w="full" gap="4" pb="5" flexDirection="column">
        <Flex w="full" flexDirection={isMobile ? "column" : "row"} gap="4">
          <FormControl isInvalid={!!form.errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input
              {...form.getFieldProps("firstName")}
              autoComplete="given-name"
            />
            <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!form.errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            <Input
              {...form.getFieldProps("lastName")}
              autoComplete="family-name"
            />
            <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
          </FormControl>
        </Flex>
        <FormControl isInvalid={!!form.errors.email}>
          <FormLabel>Email</FormLabel>
          <Input {...form.getFieldProps("email")} autoComplete="email" />
          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
        </FormControl>
      </Flex>
    </SettingsBox>
  );
}
