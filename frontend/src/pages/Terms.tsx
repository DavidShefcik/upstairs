import { Box, Text } from "@chakra-ui/react";

import SessionPage from "../components/SessionPage";
import { useIsMobile } from "../hooks/useIsMobile";

export default function TermsPage() {
  const isMobile = useIsMobile();

  return (
    <SessionPage width={isMobile ? "90vw" : "45vw"} title="Terms">
      <Box>
        <Text>Terms</Text>
      </Box>
    </SessionPage>
  );
}
