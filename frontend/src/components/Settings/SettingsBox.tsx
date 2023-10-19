import { FormEvent, ReactNode } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

import ContentBox from "../ContentBox";
import { useDeviceSize } from "../../hooks/useDeviceSize";

interface Props {
  title: string;
  isLoading: boolean;
  children: ReactNode;
  onSubmit(event: FormEvent<HTMLFormElement>): void;
  onReset(): void;
}

export default function SettingsBox({
  title,
  isLoading,
  children,
  onSubmit,
  onReset,
}: Props) {
  const { isMobile } = useDeviceSize();

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
      <form onSubmit={onSubmit}>
        <Flex
          px={isMobile ? "4" : "5"}
          minH="10"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Flex>
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
        >
          <Button
            variant="link"
            fontSize="sm"
            color="gray.800"
            isDisabled={isLoading}
            type="submit"
            title="Cancel"
            onClick={onReset}
          >
            Cancel
          </Button>
          <Button
            size="md"
            colorScheme="brand"
            w="20"
            isLoading={isLoading}
            title="Save"
            type="submit"
          >
            Save
          </Button>
        </Flex>
      </form>
    </ContentBox>
  );
}
