import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AuthenticatedCatchPage() {
  const navigate = useNavigate();

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
      <Button colorScheme="brand" onClick={() => navigate("/")}>
        Back to Safety
      </Button>
    </Flex>
  );
}
