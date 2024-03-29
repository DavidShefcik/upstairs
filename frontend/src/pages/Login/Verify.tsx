import {
  Flex,
  FormControl,
  FormErrorMessage,
  Button,
  Text,
  HStack,
  PinInput,
} from "@chakra-ui/react";
import {
  Formik,
  Field,
  FieldProps,
  FormikErrors,
  FormikHelpers,
  Form,
} from "formik";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import SessionPage from "../../components/SessionPage";
import PinInputField from "../../components/PinInputField";
import { LoginState } from ".";
import useHomeRoute from "../../hooks/useHomeRoute";

interface ForgotPasswordFormFields {
  code: string;
}

type LocationState = LoginState & {
  email: string;
};

export default function LoginVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as LocationState;
  const homeRoute = useHomeRoute();

  const validate = (
    values: ForgotPasswordFormFields
  ): FormikErrors<ForgotPasswordFormFields> => {
    const errors: FormikErrors<ForgotPasswordFormFields> = {};

    if (values.code.trim().length < 6) {
      errors.code = "Code is required!";
    }

    return errors;
  };

  const onSubmit = (
    values: ForgotPasswordFormFields,
    formikHelpers: FormikHelpers<ForgotPasswordFormFields>
  ) => {
    formikHelpers.setSubmitting(false);

    navigate(locationState?.from ?? homeRoute);
  };

  if (!locationState?.email) {
    return <Navigate to="/login" />;
  }

  return (
    <SessionPage
      title="Verify Login"
      links={[
        {
          path: "/login",
          text: "Go back",
        },
      ]}
    >
      <>
        <Text width="full" px="4" textAlign="center">
          Check your authenticator app on your phone
        </Text>
        <Formik<ForgotPasswordFormFields>
          onSubmit={onSubmit}
          validate={validate}
          initialValues={{
            code: "",
          }}
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
                  }: FieldProps<string, ForgotPasswordFormFields>) => (
                    <FormControl isInvalid={!!form.errors.code}>
                      <HStack w="full" justifyContent="center">
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
                            <PinInputField key={i} autoFocus={i === 0} />
                          ))}
                        </PinInput>
                      </HStack>
                      <FormErrorMessage>{form.errors.code}</FormErrorMessage>
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
      </>
    </SessionPage>
  );
}
