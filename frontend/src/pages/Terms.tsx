import { Box, Text } from "@chakra-ui/react";

import SessionPage from "../components/SessionPage";
import { useDeviceSize } from "../hooks/useDeviceSize";

export default function TermsPage() {
  const { isMobile } = useDeviceSize();

  return (
    <SessionPage width={isMobile ? "90vw" : "45vw"} title="Terms">
      <Box>
        <Text>Terms</Text>
      </Box>
    </SessionPage>
  );
}
