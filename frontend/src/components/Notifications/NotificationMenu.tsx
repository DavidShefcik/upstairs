import {
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi";
import { MdInbox } from "react-icons/md";
import NotificationMenuItem from "./NotificationMenuItem";
import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { NotificationStateContext } from "../../context/NotificationState";

interface Props {
  listLength: number;
}

export default function NotificationMenu({ listLength }: Props) {
  const menuListContainer = useRef<HTMLDivElement | null>();
  const navigate = useNavigate();
  const { notifications } = useContext(NotificationStateContext);
  const disclosure = useDisclosure({
    onClose: () => {
      setTimeout(() => {
        menuListContainer.current?.scroll({
          top: 0,
          behavior: "auto",
        });
      }, 200);
    },
  });

  const handleViewAllClick = () => {
    navigate("/notifications");
    disclosure.onClose();
  };

  return (
    <Menu {...disclosure}>
      <MenuButton
        as={IconButton}
        icon={!notifications.size ? <BiSolidBell /> : <BiSolidBellRing />}
        borderRadius="full"
        fontSize="2xl"
      />
      <MenuList
        ref={menuListContainer}
        mt="1"
        mr="2"
        px="2"
        shadow="lg"
        h="80"
        w="72"
        backgroundColor="white"
        overflow="auto"
      >
        {!notifications.size ? (
          <Flex
            w="full"
            h="full"
            justifyContent="center"
            alignItems="center"
            gap="4"
            flexDirection="column"
          >
            <Icon fontSize="8xl" as={MdInbox} color="gray.700" />
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="brand.600"
              fontStyle="italic"
            >
              All Caught Up!
            </Text>
          </Flex>
        ) : (
          <>
            {[...notifications.entries()]
              .slice(0, listLength)
              .sort(
                ([, a], [, b]) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map(([notificationId, notification]) => (
                <NotificationMenuItem
                  key={notificationId}
                  notification={notification}
                  closeMenu={disclosure.onClose}
                />
              ))}
            {notifications.size > listLength && (
              <Flex w="full" justifyContent="center" py="2">
                <Button variant="link" onClick={handleViewAllClick}>
                  View All
                </Button>
              </Flex>
            )}
          </>
        )}
      </MenuList>
    </Menu>
  );
}
