import { Button, Flex } from "@chakra-ui/react";
import Input from "./Input";
import useSearch from "../hooks/useSearch";
import { Search2Icon } from "@chakra-ui/icons";
import { FormEvent } from "react";

export default function SearchInput() {
  const { query, setQuery, submitQuery } = useSearch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    submitQuery();
  };

  return (
    <Flex flex="1" justifyContent="center" alignItems="center">
      <Flex as="form" flexDirection="row" onSubmit={handleSubmit}>
        <Input
          placeholder="Search..."
          width="96"
          backgroundColor="gray.50"
          fontSize="sm"
          color="gray.800"
          px="2"
          borderRightRadius="none"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button
          type="submit"
          borderLeftRadius="none"
          colorScheme="gray"
          borderLeftWidth="0"
        >
          <Search2Icon color="gray.800" />
        </Button>
      </Flex>
    </Flex>
  );
}
