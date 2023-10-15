import { Box, BoxProps } from "@chakra-ui/react";

export default function ContentBox(props: BoxProps) {
  return (
    <Box
      {...props}
      w="full"
      backgroundColor="white"
      borderRadius="sm"
      borderWidth="thin"
      borderColor="gray.300"
      shadow="sm"
    />
  );
}
