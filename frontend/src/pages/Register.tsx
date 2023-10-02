import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
} from "formik";
import SessionPage from "../components/SessionPage";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import Input from "../components/Input";
import { CognitoInstance } from "../utils/Cognito";
import { useNavigate } from "react-router-dom";

interface RegisterFormFields {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const validate = (
    values: RegisterFormFields
  ): FormikErrors<RegisterFormFields> => {
    const errors: FormikErrors<RegisterFormFields> = {};

    if (!values.email.trim()) {
      errors.email = "Email is required!";
    }
    if (!values.confirmEmail.trim()) {
      errors.confirmEmail = "Confirm email is required!";
    }
    if (!values.password.trim()) {
      errors.password = "Password is required!";
    }
    if (!values.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required!";
    }
    if (!values.firstName.trim()) {
      errors.firstName = "First name is required!";
    }
    if (!values.lastName.trim()) {
      errors.lastName = "Last name is required!";
    }

    // Cutoff errors
    if (Object.keys(errors).length > 0) {
      return errors;
    }

    if (values.email !== values.confirmEmail) {
      errors.email = "Emails do not match!";
      errors.confirmEmail = "Emails do not match!";
    }

    if (values.password !== values.confirmPassword) {
      errors.password = "Passwords do not match!";
      errors.confirmPassword = "Passwords do not match!";
    }

    return errors;
  };

  const onSubmit = async (
    values: RegisterFormFields,
    formikHelpers: FormikHelpers<RegisterFormFields>
  ) => {
    const errors: FormikErrors<RegisterFormFields> = {};

    try {
      await CognitoInstance.register(values);
    } catch (error) {
      switch (error.name) {
        case "InvalidPasswordException":
          errors.password = "Password is not long enough";
          errors.confirmPassword = "Password is not long enough";
          break;
        case "InvalidParameterException":
          errors.email = "Email is not valid";
          errors.confirmEmail = "Email is not valid";
          break;
        case "UsernameExistsException":
          errors.email = "Email is already in use";
          errors.confirmEmail = "Email is already in use";
          break;
        default:
          errors.firstName = "Something unexpected happened";
          errors.lastName = "Something unexpected happened";
          errors.email = "Something unexpected happened";
          errors.confirmEmail = "Something unexpected happened";
          errors.password = "Something unexpected happened";
          errors.confirmPassword = "Something unexpected happened";
      }
    }

    formikHelpers.setSubmitting(false);
    formikHelpers.setErrors(errors);

    navigate("/login", {
      state: {
        from: "/register",
      },
    });
  };

  return (
    <SessionPage
      title="Register"
      links={[
        {
          text: "Already have an account?",
          path: "/login",
        },
        {
          text: "Terms of Service",
          path: "/terms",
        },
      ]}
    >
      <Formik<RegisterFormFields>
        initialValues={{
          email: "",
          confirmEmail: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          password: "",
        }}
        onSubmit={onSubmit}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(props) => (
          <Form style={{ width: "100%" }}>
            <Flex flexDirection="column" gap="3" pb="4" px="8">
              <Field name="firstName">
                {({ field, form }: FieldProps<string, RegisterFormFields>) => (
                  <FormControl isInvalid={!!form.errors.firstName}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      {...field}
                      autoFocus
                      maxLength={128}
                      autoComplete="given-name"
                    />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName">
                {({ field, form }: FieldProps<string, RegisterFormFields>) => (
                  <FormControl isInvalid={!!form.errors.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      {...field}
                      maxLength={128}
                      autoComplete="family-name"
                    />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: FieldProps<string, RegisterFormFields>) => (
                  <FormControl isInvalid={!!form.errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} maxLength={128} autoComplete="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="confirmEmail">
                {({ field, form }: FieldProps<string, RegisterFormFields>) => (
                  <FormControl isInvalid={!!form.errors.confirmEmail}>
                    <FormLabel>Confirm Email</FormLabel>
                    <Input {...field} maxLength={128} autoComplete="email" />
                    <FormErrorMessage>
                      {form.errors.confirmEmail}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: FieldProps<string, RegisterFormFields>) => (
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
                {({ field, form }: FieldProps<string, RegisterFormFields>) => (
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
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </SessionPage>
  );
}
