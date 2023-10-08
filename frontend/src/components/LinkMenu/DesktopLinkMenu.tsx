import { Link, useLocation } from "react-router-dom";
import { ILinkMenuItem, ILinkMenuLink } from "./types";
import { Box, Button, Flex, Icon, MenuDivider, Text } from "@chakra-ui/react";

function MenuLink({
  item: { path, icon: IconComponent, title, showBadge },
  isActive,
}: {
  item: ILinkMenuLink;
  isActive: boolean;
}) {
  const textColor = isActive ? "white" : "gray.800";

  return (
    <Button
      as={Link}
      to={path}
      title={title}
      width="60"
      variant="ghost"
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      gap="4"
      backgroundColor="rgba(97, 34, 191, 0.1)"
      rounded="full"
      cursor="pointer"
      transition="all 200ms ease-in-out"
      _hover={{
        backgroundColor: "brand.100",
      }}
      _active={{
        backgroundColor: "brand.200",
      }}
      isActive={isActive}
    >
      <Icon
        as={IconComponent}
        w="5"
        h="5"
        color={textColor}
        transition="color 150ms ease-in-out"
      />
      <Text
        color={textColor}
        fontStyle={isActive ? "italic" : "normal"}
        fontWeight="bold"
        transition="color 100ms ease-in-out"
        flexGrow="1"
      >
        {title}
      </Text>
      <Box w="1" px="2">
        <Box
          backgroundColor="red.500"
          w="2"
          h="2"
          borderRadius="full"
          transform={`scale(${showBadge && !isActive ? "1" : "0"})`}
          transition="all 150ms ease-in-out"
        />
      </Box>
    </Button>
  );
}

export default function DesktopLinkMenu({ items }: { items: ILinkMenuItem[] }) {
  const location = useLocation();

  return (
    <Flex gap="2" mx="2" flexDirection="column">
      {items.map((item) =>
        item.type === "divider" ? (
          <MenuDivider />
        ) : (
          <MenuLink
            key={item.path}
            item={item}
            isActive={
              location.pathname.toLowerCase() === item.path.toLowerCase()
            }
          />
        )
      )}
    </Flex>
  );
}
