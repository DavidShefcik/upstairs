import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "./Navigation";
import GlobalProvider from "./context/GlobalProvider";
import { theme } from "./constants/theme";
import InitAuth from "./components/InitAuth";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalProvider>
        <InitAuth />
        <Navigation />
      </GlobalProvider>
    </ChakraProvider>
  );
}
