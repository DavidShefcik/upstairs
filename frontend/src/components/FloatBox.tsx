import { Box, BoxProps } from "@chakra-ui/react";

export default function FloatBox(props: BoxProps) {
  return (
    <Box
      shadow="md"
      backgroundColor="white"
      overflowX="hidden"
      overflowY="auto"
      borderRadius="md"
      {...props}
    />
  );
}
