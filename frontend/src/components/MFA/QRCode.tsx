import { Flex, Text } from "@chakra-ui/react";
import { useDeviceSize } from "../../hooks/useDeviceSize";

const MOCK_KEY = "TEST-Key";

export default function MFAQrCode() {
  const { isMobile } = useDeviceSize();

  return (
    <Flex gap="4" flexDirection={isMobile ? "column" : "row"}>
      <Flex backgroundColor="red.400" w="72" h="48"></Flex>
      <Flex flexDirection="column" gap="2" alignItems="flex-start">
        <Text
          w="full"
          textAlign="left"
          fontSize="sm"
          fontWeight="bold"
          textTransform="uppercase"
        >
          Scan QR Code
        </Text>
        <Text w="full" textAlign="left" fontSize="sm" fontWeight="medium">
          Open your authenticator app and scan the QR code.
        </Text>
        <Text
          w="full"
          textAlign="left"
          fontSize="sm"
          fontWeight="bold"
          textTransform="uppercase"
        >
          Key (Manual Entry)
        </Text>
        <Text w="full" textAlign="left" fontSize="md" fontWeight="medium">
          {MOCK_KEY}
        </Text>
      </Flex>
    </Flex>
  );
}
