import React from "react";
import { Button, Flex, Text, Icon, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HiExternalLink } from "react-icons/hi";

interface IFooterLink {
  text: string;
  path: string;
  isExternal?: boolean;
}

const LINKS: IFooterLink[] = [
  {
    text: "Terms",
    path: "/terms",
  },
  {
    text: "GitHub",
    path: "https://github.com/DavidShefcik/upstairs",
    isExternal: true,
  },
  {
    text: "Author",
    path: "https://davidshefcik.com/",
    isExternal: true,
  },
];

function LinkDivider() {
  return <Box h="100%" w="1px" backgroundColor="gray.300" />;
}

function FooterLink({
  item: { text, path, isExternal },
}: {
  item: IFooterLink;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isExternal) {
      navigate(path);

      return;
    }

    window.open(path, "_blank", "noreferrer");
  };

  return (
    <Button
      variant="link"
      title={text}
      onClick={handleClick}
      role="link"
      display="flex"
      flexDirection="row"
      gap="1"
    >
      <Text color="gray.800" fontSize="sm">
        {text}
      </Text>
      {isExternal && <Icon color="gray.800" as={HiExternalLink} w="3" h="3" />}
    </Button>
  );
}

export default function Footer() {
  return (
    <Flex
      width="100%"
      flexDirection="row"
      flexWrap="wrap"
      gap="2"
      justifyContent="center"
    >
      {LINKS.map((link, index) => (
        <React.Fragment key={link.path}>
          <FooterLink item={link} />
          {index !== LINKS.length - 1 && <LinkDivider />}
        </React.Fragment>
      ))}
    </Flex>
  );
}
