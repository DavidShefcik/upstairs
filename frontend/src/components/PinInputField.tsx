import {
  PinInputField as ChakraPinInputField,
  PinInputFieldProps,
} from "@chakra-ui/react";

export default function PinInputField({
  hasError,
  ...props
}: PinInputFieldProps & Partial<{ hasError: boolean }>) {
  return (
    <ChakraPinInputField
      {...props}
      borderColor={hasError ? "red.500" : "gray.300"}
      borderWidth={hasError ? "2px" : "thin"}
      _focus={{
        ...props._focus,
        borderColor: "brand.600",
      }}
      _hover={{
        borderColor: hasError ? "red.500" : "gray.300",
      }}
      w="12"
    />
  );
}
