import { SelectProps, Select as ChakraSelect } from "@chakra-ui/react";
import omit from "lodash.omit";

export default function Select(props: SelectProps) {
  return (
    <ChakraSelect
      _focus={{
        ...props._focus,
        borderColor: "brand.600",
      }}
      _active={{
        ...props._focus,
        borderColor: "brand.600",
      }}
      _hover={{
        ...props._hover,
        borderColor: "gray.400",
      }}
      backgroundColor="white"
      borderColor="gray.300"
      outline="none"
      {...omit(props, ["_focus", "_hover"])}
    />
  );
}
