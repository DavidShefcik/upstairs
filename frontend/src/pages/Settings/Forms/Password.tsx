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

interface UpdatePasswordFormFields {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function SettingsPasswordForm() {
  const validate = ({
    currentPassword,
    confirmNewPassword,
    newPassword,
  }: UpdatePasswordFormFields) => {
    const errors: FormikErrors<UpdatePasswordFormFields> = {};

    if (!currentPassword.trim()) {
      errors.currentPassword = "Current password is required!";
    }
    if (!newPassword.trim()) {
      errors.newPassword = "New password is required!";
    }
    if (!confirmNewPassword.trim()) {
      errors.confirmNewPassword = "Confirm password is required!";
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    if (currentPassword !== newPassword) {
      errors.newPassword = "Passwords do not match!";
      errors.confirmNewPassword = "Passwords do not match!";
    }

    return errors;
  };
  const handleSubmit = async (
    { currentPassword, newPassword }: UpdatePasswordFormFields,
    formikHelpers: FormikHelpers<UpdatePasswordFormFields>
  ) => {
    const errors: FormikErrors<UpdatePasswordFormFields> = {};

    try {
      await CognitoInstance.changePassword({
        currentPassword,
        newPassword,
      });
    } catch (error) {
      console.error(error);

      switch (error.name) {
        case "NotAuthorizedException":
          errors.currentPassword = "Password is incorrect!";
          break;
        default:
          errors.currentPassword = "Something unexpected happened";
          errors.newPassword = "Something unexpected happened";
          errors.confirmNewPassword = "Something unexpected happened";
      }
    }

    formikHelpers.setSubmitting(false);
    formikHelpers.setErrors(errors);
  };
  const form = useFormik<UpdatePasswordFormFields>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
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
      title="Change Password"
      isLoading={form.isSubmitting}
      onSubmit={form.handleSubmit}
      onReset={handleReset}
    >
      <Flex w="full" gap="4" pb="5" flexDirection="column">
        <FormControl isInvalid={!!form.errors.currentPassword}>
          <FormLabel>Current Password</FormLabel>
          <Input
            {...form.getFieldProps("currentPassword")}
            autoComplete="current-password"
          />
          <FormErrorMessage>{form.errors.currentPassword}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!form.errors.newPassword}>
          <FormLabel>New Password</FormLabel>
          <Input
            {...form.getFieldProps("newPassword")}
            autoComplete="new-password"
          />
          <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!form.errors.confirmNewPassword}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            {...form.getFieldProps("confirmNewPassword")}
            autoComplete="new-password"
          />
          <FormErrorMessage>{form.errors.confirmNewPassword}</FormErrorMessage>
        </FormControl>
      </Flex>
    </SettingsBox>
  );
}
