import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import UserMenu from "./UserMenu";
import NotificationMenu from "./Notifications/NotificationMenu";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Header() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const openMobileDrawer = () => {};

  return (
    <Flex
      role="header"
      width="full"
      h="16"
      backgroundColor="brand.600"
      alignItems="center"
      justifyContent="space-between"
      flexDir="row"
      px="4"
    >
      <Text
        role="button"
        fontSize="xl"
        fontWeight="bold"
        fontStyle="italic"
        onClick={() => navigate("/")}
        title="Upstairs"
        color="gray.50"
      >
        Upstairs
      </Text>
      <Flex gap="3" flexDirection="row" alignItems="center">
        {isMobile ? (
          <IconButton
            as={HamburgerIcon}
            onClick={openMobileDrawer}
            aria-label="Drawer Menu"
            color="gray.800"
            backgroundColor="gray.100"
            size="sm"
            w="12"
            h="10"
            px="2"
            cursor="pointer"
            shadow="sm"
          />
        ) : (
          <>
            <NotificationMenu listLength={8} />
            <UserMenu />
          </>
        )}
      </Flex>
    </Flex>
  );
}
