import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    styles: {
      global: {},
    },
    colors: {
      black: "#0c1015",
      brand: {
        50: "#BC9BED",
        100: "#BC9BED",
        200: "#A274E6",
        300: "#884DDF",
        400: "#6122bf",
        500: "#6122bf",
        600: "#6122bf",
        700: "#6122bf",
        800: "#6122bf",
        900: "#6122bf",
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
  })
);
