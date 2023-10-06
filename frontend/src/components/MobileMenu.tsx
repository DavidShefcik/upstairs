import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  UseDisclosureReturn,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "../context/AuthenticationState";
import { Link, useLocation } from "react-router-dom";
import { useNotifications } from "../context/NotificationState";
import LogoutModal from "./Modals/LogoutModal";
import { useEffect } from "react";

function Divider() {
  return (
    <hr
      style={{
        width: "100%",
        border: 0,
        borderBottom: "1px solid var(--chakra-colors-chakra-border-color)",
        marginTop: "var(--chakra-space-2)",
        marginBottom: "var(--chakra-space-2)",
      }}
    />
  );
}

function LinkButton({
  text,
  path,
  showBadge,
}: {
  text: string;
  path: string;
  showBadge?: boolean;
}) {
  return (
    <Button
      as={Link}
      to={path}
      title={text}
      variant="ghost"
      colorScheme="white"
    >
      {showBadge && (
        <Box pr="2">
          <Box backgroundColor="red.400" w="2" h="2" borderRadius="full" />
        </Box>
      )}
      <Text
        w="full"
        textAlign="left"
        color="gray.800"
        fontWeight="semibold"
        fontSize="xl"
      >
        {text}
      </Text>
    </Button>
  );
}

export default function MobileMenu(props: UseDisclosureReturn) {
  const { session } = useSession();
  const { hasUnreadNotifications } = useNotifications();
  const logoutModal = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    props.onClose();
  }, [location, props.onClose]);

  const handleLogout = () => {
    logoutModal.onOpen();
  };

  return (
    <>
      <Drawer {...props} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton position="relative" left="4" size="lg" />
          <Flex w="full" px="7" mt="5" gap="2" flexDirection="column">
            <Box w="full">
              <Text fontWeight="semibold" fontSize="2xl">
                Welcome,{" "}
                <Text
                  as="span"
                  fontWeight="bold"
                  fontStyle="italic"
                  color="brand.600"
                >
                  {session.user.firstName}
                </Text>
                !
              </Text>
            </Box>
            <Divider />
            <LinkButton
              text="Notifications"
              path="/notifications"
              showBadge={hasUnreadNotifications}
            />
            <LinkButton text="Profile" path="/profile" />
            <LinkButton text="Settings" path="/settings" />
            <Divider />
            <Button
              transition="all"
              transitionDuration="100ms"
              title="Logout"
              onClick={handleLogout}
              colorScheme="red"
            >
              Logout
            </Button>
          </Flex>
        </DrawerContent>
      </Drawer>
      <LogoutModal {...logoutModal} />
    </>
  );
}
