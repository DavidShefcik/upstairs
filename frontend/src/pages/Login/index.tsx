import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import {
  Field,
  FormikHelpers,
  FormikErrors,
  Formik,
  Form,
  FieldProps,
} from "formik";

import Input from "../../components/Input";
import SessionPage from "../../components/SessionPage";
import { useLocation, useNavigate } from "react-router-dom";
import { CognitoInstance, ExposedUserFields } from "../../utils/Cognito";
import { useSession } from "../../context/AuthenticationState";

interface LoginFormFields {
  email: string;
  password: string;
}
export interface LoginState {
  continueTo?: string;
  needToLogin?: boolean;
  from?: string;
}

interface InfoBoxValues {
  title: string;
  subtitle: string;
  variant: "warn" | "info";
}
type FromInfoBoxValues = Record<string, InfoBoxValues>;

const INFO_BOX_VALUES: FromInfoBoxValues = {
  "/forgot-password/change": {
    title: "Password Changed",
    subtitle: "Please log in to continue",
    variant: "info",
  },
  "/register": {
    title: "Welcome to Upstairs!",
    subtitle: "Please log in to get started",
    variant: "info",
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useSession();
  const locationState = location.state as LoginState;

  const validate = (values: LoginFormFields): FormikErrors<LoginFormFields> => {
    const errors: FormikErrors<LoginFormFields> = {};

    if (!values.email.trim()) {
      errors.email = "Email is required";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const onSubmit = async (
    values: LoginFormFields,
    formikHelpers: FormikHelpers<LoginFormFields>
  ) => {
    const errors: FormikErrors<LoginFormFields> = {};
    let userFields: ExposedUserFields;

    try {
      const result = await CognitoInstance.login(values);

      if (result.needToVerify) {
        navigate("/login/verify", {
          state: {
            email: values.email,
            ...(locationState.continueTo && {
              continueTo: locationState.continueTo,
            }),
          },
        });

        return;
      }

      userFields = result.user;
    } catch (error) {
      console.log(error);

      switch (error.name) {
        case "UserNotFoundException":
          errors.email = "User not found";
          break;
        case "NotAuthorizedException":
          errors.email = "Incorrect email or password";
          errors.password = "Incorrect email or password";
          break;
        default:
          errors.email = "Something unexpected happened";
          errors.password = "Something unexpected happened";
      }
    }

    if (Object.keys(errors).length > 0) {
      formikHelpers.setSubmitting(false);
      formikHelpers.setErrors(errors);

      return;
    }

    login(userFields);

    navigate("/");
  };

  const getInfoBoxFields = (): InfoBoxValues | null => {
    if (!locationState?.from) {
      return null;
    }

    if (locationState.needToLogin) {
      return {
        title: "Please log in",
        subtitle: "You must be logged in to do that",
        variant: "warn",
      };
    }

    return INFO_BOX_VALUES[locationState.from];
  };

  const infoBoxFields = getInfoBoxFields();

  return (
    <SessionPage
      title="Login"
      links={[
        {
          text: `Don't have an account?`,
          path: "/register",
        },
        {
          text: "Forgot Password",
          path: "/forgot-password",
        },
      ]}
    >
      {infoBoxFields && (
        <Flex
          backgroundColor="brand.300"
          borderColor="brand.600"
          borderWidth="medium"
          borderRadius="md"
          overflow="hidden"
          p="2"
          w="80"
          flexDirection="column"
          gap="1"
        >
          <Text
            color="white"
            fontWeight="bold"
            fontStyle="italic"
            fontSize="md"
          >
            {infoBoxFields.title}
          </Text>
          <Text color="gray.50" fontSize="sm" fontWeight="semibold">
            {infoBoxFields.subtitle}
          </Text>
        </Flex>
      )}
      <Formik<LoginFormFields>
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(props) => (
          <Form style={{ width: "100%" }}>
            <Flex flexDirection="column" gap="3" pb="4" px="8">
              <Field name="email">
                {({ field, form }: FieldProps<string, LoginFormFields>) => (
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
              <Field name="password">
                {({ field, form }: FieldProps<string, LoginFormFields>) => (
                  <FormControl isInvalid={!!form.errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} type="password" maxLength={1024} />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button type="submit" isLoading={props.isSubmitting}>
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </SessionPage>
  );
}
