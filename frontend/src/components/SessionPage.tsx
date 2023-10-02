import { Flex, Button, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageLink {
  text: string;
  path: string;
}
interface Props {
  title: string;
  children: ReactNode;
  links?: PageLink[];
  width?: string;
}

export default function SessionPage({
  title,
  children,
  links,
  width = "96",
}: Props) {
  return (
    <Flex
      w={width}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="4"
      pt="8"
      pb="6"
    >
      <Text
        color="brand.600"
        fontWeight="bold"
        fontStyle="italic"
        fontSize="2xl"
      >
        {title}
      </Text>
      {children}
      {links && links.length > 0 && (
        <Flex
          width="full"
          gap="6"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {links.map((link) => (
            <Button
              key={link.path}
              variant="link"
              as={Link}
              to={link.path}
              colorScheme="brand"
            >
              {link.text}
            </Button>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
