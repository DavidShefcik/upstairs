import { Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import UserMenu from "./UserMenu";
import NotificationMenu from "./Notifications/NotificationMenu";
import { useIsMobile } from "../hooks/useIsMobile";
import MobileMenu from "./MobileMenu";
import SearchMobileMenu from "./SearchMobileMenu";
import { useSession } from "../context/AuthenticationState";
import SearchInput from "./SearchInput";

export default function Header() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const mobileMenuDisclosure = useDisclosure();
  const searchMobileMenuDisclosure = useDisclosure();
  const { session } = useSession();

  const openMobileDrawer = () => {
    mobileMenuDisclosure.onOpen();
    searchMobileMenuDisclosure.onClose();
  };
  const openSearch = () => {
    searchMobileMenuDisclosure.onOpen();
    mobileMenuDisclosure.onClose();
  };

  const isSearchAvailable = session.isLoggedIn && session.user.neighborhoodId;

  return (
    <>
      <Flex
        role="header"
        width="full"
        h="16"
        backgroundColor="brand.600"
        alignItems="center"
        justifyContent="space-between"
        flexDir="row"
        px="4"
        minHeight="64px"
        position="sticky"
        top="0"
        left="0"
        zIndex="sticky"
      >
        <Flex
          h="full"
          flexDirection="row"
          gap="3"
          justifyContent="flex-start"
          alignItems="center"
        >
          {isMobile && session.isLoggedIn && (
            <IconButton
              as={HamburgerIcon}
              onClick={openMobileDrawer}
              aria-label="Drawer Menu"
              color="gray.50"
              cursor="pointer"
              w="10"
              h="10"
            />
          )}
          <Text
            role="button"
            fontSize="xl"
            fontWeight="bold"
            fontStyle="italic"
            onClick={() => navigate("/feed")}
            title="Upstairs"
            color="gray.50"
          >
            Upstairs
          </Text>
        </Flex>
        {!isMobile && isSearchAvailable && <SearchInput />}
        <Flex gap="3" flexDirection="row" alignItems="center">
          {isMobile && isSearchAvailable ? (
            <IconButton
              as={Search2Icon}
              onClick={openSearch}
              aria-label="Search Menu"
              color="gray.50"
              cursor="pointer"
              w="6"
              h="6"
            />
          ) : !isMobile ? (
            <>
              <NotificationMenu listLength={8} />
              <UserMenu />
            </>
          ) : null}
        </Flex>
      </Flex>
      {isMobile && <MobileMenu {...mobileMenuDisclosure} />}
      {isMobile && isSearchAvailable && (
        <SearchMobileMenu {...searchMobileMenuDisclosure} />
      )}
    </>
  );
}
