import { BoxProps, Flex, Text } from "@chakra-ui/react";
import FloatBox from "../components/FloatBox";
import { ReactNode, useEffect } from "react";
import { useDeviceSize } from "../hooks/useDeviceSize";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
  boxStyles?: BoxProps;
  showHeader?: boolean;
}

export default function BrandedFloatBox({
  children,
  boxStyles,
  showHeader = true,
}: Props) {
  const { isMobile } = useDeviceSize();

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
      {showHeader && (
        <Text
          p="4"
          fontSize="xl"
          fontWeight="bold"
          fontStyle="italic"
          title="Upstairs"
          color="gray.50"
          height="16"
        >
          Upstairs
        </Text>
      )}
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
        <FloatBox
          minH="64"
          minW={isMobile ? "72" : "96"}
          h="auto"
          w="auto"
          maxW="99%"
          {...boxStyles}
        >
          {children}
        </FloatBox>
      </Flex>
      <Flex w="full" py="3" justifyContent="center" alignItems="center">
        <Footer textColor="gray.50" dividerColor="transparent" />
      </Flex>
    </Flex>
  );
}
