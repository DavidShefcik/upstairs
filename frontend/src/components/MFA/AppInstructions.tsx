import { Flex, Link, Text } from "@chakra-ui/react";

const GOOGLE_AUTHENTICATOR_LINK =
  "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2";
const AUTHY_LINK =
  "https://play.google.com/store/apps/details?id=com.authy.authy&hl=en_US&gl=US";

export default function MFAAppInstructions() {
  return (
    <Flex flexDirection="column" gap="2" alignItems="flex-start">
      <Text
        w="full"
        textAlign="left"
        fontSize="sm"
        fontWeight="bold"
        textTransform="uppercase"
      >
        Download an authenticator app
      </Text>
      <Text w="full" textAlign="left" color="gray.700" fontWeight="medium">
        Download and install{" "}
        <Link
          colorScheme="brand"
          color="brand.600"
          fontWeight="semibold"
          isExternal
          href={GOOGLE_AUTHENTICATOR_LINK}
          title="Google Authenticator"
        >
          Google Authenticator
        </Link>{" "}
        or{" "}
        <Link
          colorScheme="brand"
          color="brand.600"
          fontWeight="semibold"
          isExternal
          href={AUTHY_LINK}
          title="Authy"
        >
          Authy
        </Link>{" "}
        on your phone or tablet.
      </Text>
    </Flex>
  );
}
