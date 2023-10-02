import { InputProps, Input as ChakraInput } from "@chakra-ui/react";

export default function Input(props: InputProps) {
  return (
    <ChakraInput
      {...props}
      _focus={{
        ...props._focus,
        borderColor: "brand.600",
      }}
      _hover={{
        borderColor: "gray.400",
      }}
      borderColor="gray.300"
    />
  );
}
