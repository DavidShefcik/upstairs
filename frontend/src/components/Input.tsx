import { InputProps, Input as ChakraInput } from "@chakra-ui/react";
import omit from "lodash.omit";

export default function Input(props: InputProps) {
  return (
    <ChakraInput
      _focus={{
        borderColor: "brand.600",
        ...props._focus,
      }}
      _hover={{
        borderColor: "gray.400",
        ...props._hover,
      }}
      borderColor="gray.300"
      {...omit(props, ["_focus", "_hover"])}
    />
  );
}
