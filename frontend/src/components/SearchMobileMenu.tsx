import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import Input from "./Input";
import useSearch from "../hooks/useSearch";

export default function SearchMobileMenu(props: UseDisclosureReturn) {
  const { query, setQuery, submitQuery } = useSearch();

  const handleClose = () => {
    props.onClose();
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const success = submitQuery();

    if (success) {
      props.onClose();
    }
  };

  const isInputDisabled = query.trim().length === 0;

  return (
    <Drawer {...props} placement="top">
      <DrawerOverlay />
      <DrawerContent h="16" backgroundColor="gray.50">
        <form style={{ height: "100%", width: "100%" }} onSubmit={handleSubmit}>
          <Flex
            w="full"
            h="full"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            px="6"
          >
            <Button onClick={handleClose} borderRightRadius="none">
              <CloseIcon />
            </Button>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              autoFocus
              borderRadius="none"
              px="2"
              fontSize="sm"
              borderColor="brand.600"
              type="search"
            />
            <Button
              type="submit"
              borderLeftRadius="none"
              aria-disabled={isInputDisabled}
              isDisabled={isInputDisabled}
              // disabled={isInputDisabled}
              _disabled={{
                opacity: "0.6",
              }}
            >
              <Search2Icon />
            </Button>
          </Flex>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
