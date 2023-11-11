import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { BiSolidUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthenticationStateContext } from "../context/AuthenticationState";
import LogoutModal from "./Modals/LogoutModal";

export default function UserMenu() {
  const { session } = useContext(AuthenticationStateContext);
  const logoutModal = useDisclosure();

  const handleLogout = () => {
    logoutModal.onOpen();
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<BiSolidUser />}
          color="gray.800"
          _hover={{
            backgroundColor: "white",
          }}
          _active={{
            backgroundColor: "white",
          }}
          _focus={{
            backgroundColor: "white",
          }}
          backgroundColor="white"
          borderRadius="full"
          fontSize="xl"
        />
        <MenuList mt="1" mr="2" px="2" shadow="lg">
          <MenuItem
            display="flex"
            fontWeight="medium"
            _hover={{ backgroundColor: "white" }}
            _active={{ backgroundColor: "white" }}
            _focus={{ backgroundColor: "white" }}
            closeOnSelect={false}
            cursor="default"
          >
            Welcome,{" "}
            <Text pl="1" fontWeight="bold" fontStyle="italic" color="brand.600">
              {session.user.firstName}
            </Text>
            !
          </MenuItem>
          <MenuDivider />
          {session.user.neighborhoodId && (
            <MenuItem
              py="2"
              fontWeight="medium"
              as={Link}
              title="Profile"
              to="/profile"
            >
              Profile
            </MenuItem>
          )}
          <MenuItem
            py="2"
            fontWeight="medium"
            as={Link}
            title="Settings"
            to="/settings"
          >
            Settings
          </MenuItem>
          <MenuDivider />
          <MenuItem
            color="red.500"
            backgroundColor="white"
            _hover={{
              backgroundColor: "red.50",
            }}
            transition="all"
            transitionDuration="100ms"
            title="Logout"
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <LogoutModal {...logoutModal} />
    </>
  );
}
