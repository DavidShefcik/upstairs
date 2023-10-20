import {
  Button,
  Flex,
  FlexProps,
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
import { useDeviceSize } from "../../hooks/useDeviceSize";

interface LoginFormFields {
  email: string;
  password: string;
}
export interface LoginState {
  needToLogin?: boolean;
  from?: string;
}

type Variant = "warn" | "info";

interface InfoBoxValues {
  title: string;
  subtitle: string;
  variant: Variant;
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
  "/settings/account#delete": {
    title: "Account Deleted",
    subtitle: "Your account has been successfully deleted",
    variant: "info",
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useDeviceSize();
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
            ...(locationState.from && {
              from: locationState.from,
            }),
          },
        });

        return;
      }

      userFields = result.user;
    } catch (error) {
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

    navigate(locationState.from ?? "/feed");
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

  const getInfoBoxColors = (
    variant: Variant
  ): Pick<FlexProps, "backgroundColor" | "borderColor"> & {
    titleTextColor: string;
    subtitleTextColor: string;
  } => {
    switch (variant) {
      case "info":
        return {
          backgroundColor: "brand.300",
          borderColor: "brand.600",
          titleTextColor: "white",
          subtitleTextColor: "gray.50",
        };
      case "warn":
        return {
          backgroundColor: "red.400",
          borderColor: "red.500",
          titleTextColor: "black",
          subtitleTextColor: "gray.800",
        };
    }
  };

  const infoBoxFields = getInfoBoxFields();
  const infoBoxColors = getInfoBoxColors(infoBoxFields?.variant);

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
          borderWidth="medium"
          borderRadius="md"
          overflow="hidden"
          p="2"
          w={isMobile ? "64" : "80"}
          flexDirection="column"
          gap="1"
          backgroundColor={infoBoxColors.backgroundColor}
          borderColor={infoBoxColors.borderColor}
        >
          <Text
            fontWeight="bold"
            fontStyle="italic"
            fontSize="md"
            color={infoBoxColors.titleTextColor}
          >
            {infoBoxFields.title}
          </Text>
          <Text
            color={infoBoxColors.subtitleTextColor}
            fontSize="sm"
            fontWeight="semibold"
          >
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
                    <Input
                      {...field}
                      type="password"
                      maxLength={1024}
                      autoComplete="current-password"
                    />
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
