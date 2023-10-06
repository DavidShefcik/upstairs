import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";

import { Notification } from "../../context/NotificationState";

export default function NotificationMenuItem({
  notification,
  closeMenu,
}: {
  notification: Notification;
  closeMenu(): void;
}) {
  const handleClick = () => {
    closeMenu();
  };

  return (
    <Flex
      as={Button}
      onClick={handleClick}
      w="full"
      h="auto"
      flexDirection="row"
      gap="1"
      px="2"
      py="2"
      my="1"
      backgroundColor={notification.isNew ? "gray.100" : "white"}
      _hover={{
        backgroundColor: "gray.50",
      }}
    >
      <Flex
        w="full"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Text
          color="gray.700"
          fontWeight="medium"
          w="full"
          whiteSpace="normal"
          textAlign="left"
        >
          {notification.text}
        </Text>
        <Text color="gray.400" fontSize="sm" fontWeight="normal">
          {formatDistanceToNow(parseISO(notification.date))}
        </Text>
      </Flex>
      {notification.isNew && (
        <Box pr="2">
          <Box backgroundColor="red.400" w="2" h="2" borderRadius="full" />
        </Box>
      )}
    </Flex>
  );
}
