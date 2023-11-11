import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useHomeRoute from "../hooks/useHomeRoute";

export default function AuthenticatedCatchPage() {
  const navigate = useNavigate();
  const homeRoute = useHomeRoute();

  return (
    <Flex
      h="full"
      w="full"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="4"
    >
      <Text fontSize="2xl" fontWeight="bold" fontStyle="italic">
        Not Found!
      </Text>
      <Text>The requested page was not found</Text>
      <Button colorScheme="brand" onClick={() => navigate(homeRoute)}>
        Back to Safety
      </Button>
    </Flex>
  );
}
