import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";

const extractSearchQuery = (location: Location): string => {
  if (location.pathname !== "/search" || !location.search) {
    return "";
  }

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  if (!query) {
    return "";
  }

  return query;
};

export default function SearchMobileMenu(props: UseDisclosureReturn) {
  const location = useLocation();
  const [query, setQuery] = useState(extractSearchQuery(location));
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(extractSearchQuery(location));
  }, [location]);

  const handleClose = () => {
    setQuery(extractSearchQuery(location));
    props.onClose();
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    navigate(`/search?query=${query}`);
    props.onClose();
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
            />
            <Button
              type="submit"
              onClick={handleSubmit}
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
