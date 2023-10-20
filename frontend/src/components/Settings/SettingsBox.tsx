import { FormEvent, ReactNode } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

import ContentBox from "../ContentBox";
import { useDeviceSize } from "../../hooks/useDeviceSize";

interface BaseProps {
  title: string;
  children: ReactNode;
}
type Props = BaseProps &
  (
    | {
        showFooter: true;
        isLoading: boolean;
        onSubmit(event: FormEvent<HTMLFormElement>): void;
        onReset(): void;
        submitButtonColorScheme?: string;
        submitButtonText?: string;
      }
    | {
        showFooter?: false;
      }
  );

export default function SettingsBox({ title, children, ...props }: Props) {
  const { isMobile } = useDeviceSize();

  return (
    <ContentBox>
      <Flex
        h="12"
        w="full"
        justifyContent="flex-start"
        alignItems="center"
        px="4"
        mb={props.showFooter ? "3" : "0"}
        borderBottomWidth="thin"
        borderBottomColor="gray.100"
      >
        <Text fontSize="md" fontWeight="bold" fontStyle="italic">
          {title}
        </Text>
      </Flex>
      <form
        onSubmit={(event) =>
          props.showFooter ? props.onSubmit(event) : event.preventDefault()
        }
      >
        <Flex
          px={isMobile ? "4" : "5"}
          minH="10"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Flex>
        {props.showFooter && (
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
              isDisabled={props.isLoading}
              type="submit"
              title="Cancel"
              onClick={props.onReset}
            >
              Cancel
            </Button>
            <Button
              size="md"
              colorScheme={props.submitButtonColorScheme ?? "brand"}
              minW="20"
              w="auto"
              isLoading={props.isLoading}
              title={props.submitButtonText ?? "Save"}
              type="submit"
            >
              {props.submitButtonText ?? "Save"}
            </Button>
          </Flex>
        )}
      </form>
    </ContentBox>
  );
}
