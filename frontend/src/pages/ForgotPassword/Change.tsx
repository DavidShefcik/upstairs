import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  PinInput,
} from "@chakra-ui/react";
import SessionPage from "../../components/SessionPage";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
} from "formik";
import PinInputField from "../../components/PinInputField";
import { CognitoInstance } from "../../utils/Cognito";

interface ChangePasswordFormFields {
  code: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;

  const validate = (
    values: ChangePasswordFormFields
  ): FormikErrors<ChangePasswordFormFields> => {
    const errors: FormikErrors<ChangePasswordFormFields> = {};

    if (values.code.trim().length < 6) {
      errors.code = "Code is required!";
    }
    if (!values.password.trim()) {
      errors.password = "Password is required!";
    }
    if (!values.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required!";
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    if (values.password !== values.confirmPassword) {
      errors.password = "Passwords do not match!";
      errors.confirmPassword = "Passwords do not match!";
    }

    return errors;
  };

  const onSubmit = async (
    values: ChangePasswordFormFields,
    formikHelpers: FormikHelpers<ChangePasswordFormFields>
  ) => {
    const errors: FormikErrors<ChangePasswordFormFields> = {};

    try {
      await CognitoInstance.resetPassword({
        code: values.code,
        newPassword: values.password,
        email,
      });
      navigate("/login", {
        state: {
          from: "/forgot-password/change",
        },
      });
    } catch (error) {
      console.error(error);

      switch (error.name) {
        case "ExpiredCodeException":
          errors.code = "Invalid code!";
          break;
        case "InvalidPasswordException":
          errors.password = "Password is not valid!";
          errors.confirmPassword = "Password is not valid!";
          break;
        default:
          errors.code = "Something unexpected happened!";
          errors.password = "Something unexpected happened!";
          errors.confirmPassword = "Something unexpected happened!";
          break;
      }
    }

    formikHelpers.setSubmitting(false);
    formikHelpers.setErrors(errors);
  };

  if (!email) {
    return <Navigate to="/" />;
  }

  return (
    <SessionPage title="Change Password">
      <Formik<ChangePasswordFormFields>
        initialValues={{
          email,
          code: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={onSubmit}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(props) => (
          <Form style={{ width: "100%" }}>
            <Flex flexDirection="column" gap="3" pb="4" px="8">
              <Field name="code">
                {({
                  field,
                  form,
                }: FieldProps<string, ChangePasswordFormFields>) => (
                  <FormControl isInvalid={!!form.errors.code}>
                    <FormLabel>Code</FormLabel>
                    <HStack w="full" justifyContent="flex-start">
                      <PinInput
                        value={field.value}
                        onChange={(value) => {
                          field.onChange({
                            target: {
                              name: "code",
                              value,
                            },
                          });
                        }}
                      >
                        {new Array(6).fill(0).map((_, i) => (
                          <PinInputField
                            key={i}
                            autoFocus={i === 0}
                            w="auto"
                            hasError={!!form.errors.code}
                          />
                        ))}
                      </PinInput>
                    </HStack>
                    <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({
                  field,
                  form,
                }: FieldProps<string, ChangePasswordFormFields>) => (
                  <FormControl isInvalid={!!form.errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      {...field}
                      type="password"
                      maxLength={1024}
                      autoComplete="new-password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="confirmPassword">
                {({
                  field,
                  form,
                }: FieldProps<string, ChangePasswordFormFields>) => (
                  <FormControl isInvalid={!!form.errors.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      {...field}
                      type="password"
                      maxLength={1024}
                      autoComplete="new-password"
                    />
                    <FormErrorMessage>
                      {form.errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button type="submit" isLoading={props.isSubmitting}>
                Change Password
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </SessionPage>
  );
}
