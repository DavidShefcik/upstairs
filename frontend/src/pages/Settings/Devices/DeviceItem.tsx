import { Flex, IconButton, Text } from "@chakra-ui/react";
import {
  AiOutlineMobile,
  AiOutlineTablet,
  AiOutlineDesktop,
} from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
import { format } from "date-fns";

import { DeviceSession, SessionDeviceType } from "../../../utils/Cognito";
import { IconType } from "react-icons";
import { CloseIcon } from "@chakra-ui/icons";
import { useDeviceSize } from "../../../hooks/useDeviceSize";

const DEVICE_ICON_MAP: Record<SessionDeviceType, IconType> = {
  [SessionDeviceType.PHONE]: AiOutlineMobile,
  [SessionDeviceType.TABLET]: AiOutlineTablet,
  [SessionDeviceType.DESKTOP]: AiOutlineDesktop,
};

interface Props {
  device: DeviceSession;
  onRemoveDevice(device: DeviceSession): void;
  showBottomBorder?: boolean;
}

const DATE_FORMAT = "MMM d, yyyy";

export default function DeviceItem({
  device,
  showBottomBorder = true,
  onRemoveDevice,
}: Props) {
  const { deviceType, firstSeen, lastIPUsed, lastUsed, isCurrentSession } =
    device;
  const { isMobile } = useDeviceSize();

  if (isMobile) {
    return (
      <Flex
        w="full"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px="2"
        py="4"
        h="auto"
        borderBottomWidth="thin"
        borderBottomColor={showBottomBorder ? "gray.200" : "transparent"}
        gap="2"
      >
        <Flex
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Icon
            as={DEVICE_ICON_MAP[deviceType]}
            w="6"
            h="6"
            mr="4"
            color={isCurrentSession ? "green.400" : "gray.800"}
          />
          {isCurrentSession ? (
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="green.400"
              textTransform="uppercase"
              flexGrow={1}
              textAlign="center"
            >
              (Current Session)
            </Text>
          ) : (
            <div />
          )}
          <IconButton
            icon={<Icon as={CloseIcon} w="3" h="3" />}
            onClick={() => onRemoveDevice(device)}
            aria-label="Remove Device"
            variant="ghost"
            colorScheme="red"
            title="Remove Device"
            size="md"
          />
        </Flex>
        <Flex
          w="full"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2"
        >
          <Text
            fontSize="xs"
            textTransform="uppercase"
            fontWeight="bold"
            display="inline"
            verticalAlign="middle"
          >
            First Used: {format(firstSeen, DATE_FORMAT)}
          </Text>
          <Text
            fontSize="xs"
            textTransform="uppercase"
            fontWeight="bold"
            display="inline"
            verticalAlign="middle"
          >
            Last Used: {format(lastUsed, DATE_FORMAT)}
          </Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      w="full"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      px="2"
      h="20"
      pb="1"
      borderBottomWidth="thin"
      borderBottomColor={showBottomBorder ? "gray.200" : "transparent"}
    >
      <Icon
        as={DEVICE_ICON_MAP[deviceType]}
        w="6"
        h="6"
        mr="4"
        color={isCurrentSession ? "green.400" : "gray.800"}
      />
      <Flex
        flexGrow={1}
        height="100%"
        flexDirection="column"
        justifyContent="center"
      >
        <Flex flexDirection="row" width="100%" gap="2" alignItems="center">
          <Text
            fontSize="xs"
            textTransform="uppercase"
            fontWeight="bold"
            display="flex"
            alignItems="center"
          >
            First Used: {format(firstSeen, DATE_FORMAT)}
          </Text>
          <Text
            textAlign="center"
            fontSize="xl"
            display="flex"
            alignItems="center"
          >
            &middot;
          </Text>
          <Text
            fontSize="xs"
            textTransform="uppercase"
            fontWeight="bold"
            display="flex"
            alignItems="center"
          >
            Last Used: {format(lastUsed, DATE_FORMAT)}
          </Text>
        </Flex>
        <Flex w="full" flexDirection="row" gap="2">
          <Text
            fontSize="sm"
            fontWeight="medium"
            display="flex"
            alignItems="center"
          >
            {lastIPUsed}
          </Text>
          {isCurrentSession && (
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="green.400"
              textTransform="uppercase"
              display="flex"
              alignItems="center"
            >
              (Current Session)
            </Text>
          )}
        </Flex>
      </Flex>
      <IconButton
        icon={<Icon as={CloseIcon} w="3" h="3" />}
        onClick={() => onRemoveDevice(device)}
        aria-label="Remove Device"
        variant="ghost"
        colorScheme="red"
        title="Remove Device"
      />
    </Flex>
  );
}
