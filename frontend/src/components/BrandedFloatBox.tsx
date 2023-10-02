import { BoxProps, Flex, Text } from "@chakra-ui/react";
import FloatBox from "../components/FloatBox";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  boxStyles?: BoxProps;
}

export default function BrandedFloatBox({ children, boxStyles }: Props) {
  useEffect(() => {
    document.body.style.backgroundColor = "#6122bf";
  }, []);

  return (
    <Flex
      flexDirection="column"
      w="full"
      minH="full"
      overflow="auto"
      backgroundColor="brand.600"
      alignItems="flex-start"
    >
      <Text
        p="4"
        fontSize="xl"
        fontWeight="bold"
        fontStyle="italic"
        title="Upstairs"
        color="gray.50"
      >
        Upstairs
      </Text>
      <Flex
        flexDirection="column"
        flexGrow={1}
        overflow="auto"
        width="100%"
        justifyContent="center"
        alignItems="center"
        gap="8"
        p="4"
      >
        <FloatBox minH="64" minW="64" h="auto" w="auto" {...boxStyles}>
          {children}
        </FloatBox>
      </Flex>
    </Flex>
  );
}
