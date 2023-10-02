import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import {
  Formik,
  Field,
  FieldProps,
  FormikErrors,
  FormikHelpers,
  Form,
} from "formik";

import SessionPage from "../../components/SessionPage";

import { CognitoInstance } from "../../utils/Cognito";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordFormFields {
  email: string;
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const validate = (
    values: ForgotPasswordFormFields
  ): FormikErrors<ForgotPasswordFormFields> => {
    const errors: FormikErrors<ForgotPasswordFormFields> = {};

    if (!values.email.trim()) {
      errors.email = "Email is required!";
    }

    return errors;
  };

  const onSubmit = async (
    values: ForgotPasswordFormFields,
    formikHelpers: FormikHelpers<ForgotPasswordFormFields>
  ) => {
    const errors: FormikErrors<ForgotPasswordFormFields> = {};

    try {
      await CognitoInstance.requestForgotPasswordEmail(values.email);
    } catch (error) {
      console.error(error);

      switch (error.name) {
        default:
          errors.email = "Something unexpected happened";
          break;
      }
    }

    if (Object.keys(errors).length === 0) {
      navigate("/forgot-password/change", {
        state: {
          email: values.email,
        },
      });

      return;
    }

    formikHelpers.setSubmitting(false);
    formikHelpers.setErrors(errors);
  };

  return (
    <SessionPage
      title="Forgot Password"
      links={[
        {
          path: "/login",
          text: "Go back",
        },
      ]}
    >
      <Formik<ForgotPasswordFormFields>
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{
          email: "",
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(props) => (
          <Form style={{ width: "100%" }}>
            <Flex flexDirection="column" gap="3" pb="4" px="8">
              <Field name="email">
                {({
                  field,
                  form,
                }: FieldProps<string, ForgotPasswordFormFields>) => (
                  <FormControl isInvalid={!!form.errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...field}
                      autoFocus
                      maxLength={128}
                      autoComplete="email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button type="submit" isLoading={props.isSubmitting}>
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </SessionPage>
  );
}
