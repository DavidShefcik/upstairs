import { ReactNode } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import ContentBox from "../ContentBox";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props {
  title: string;
  isLoading: boolean;
  children: ReactNode;
  onSubmit(): void;
  onReset(): void;
}

export default function SettingsBox({
  title,
  isLoading,
  children,
  onSubmit,
  onReset,
}: Props) {
  const isMobile = useIsMobile();

  return (
    <ContentBox>
      <Flex
        h="12"
        w="full"
        justifyContent="flex-start"
        alignItems="center"
        px="4"
        mb="3"
        borderBottomWidth="thin"
        borderBottomColor="gray.100"
      >
        <Text fontSize="md" fontWeight="bold" fontStyle="italic">
          {title}
        </Text>
      </Flex>
      <Box px={isMobile ? "4" : "5"} minH="10">
        {children}
      </Box>
      <Flex
        w="full"
        h="14"
        px="3"
        justifyContent="flex-end"
        alignItems="center"
        backgroundColor="gray.100"
        borderTopWidth="thin"
        borderColor="gray.200"
        gap="8"
        title="Cancel"
        onClick={onReset}
      >
        <Button variant="link" fontSize="sm" color="gray.800">
          Cancel
        </Button>
        <Button
          size="md"
          colorScheme="brand"
          w="20"
          isLoading={isLoading}
          title="Save"
          onClick={onSubmit}
        >
          Save
        </Button>
      </Flex>
    </ContentBox>
  );
}
