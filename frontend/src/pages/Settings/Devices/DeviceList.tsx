import { useEffect, useState } from "react";
import { Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

import { CognitoInstance, DeviceSession } from "../../../utils/Cognito";
import DeviceItem from "./DeviceItem";
import RemoveDeviceModal from "../../../components/Modals/RemoveDeviceModal";

export default function DeviceList() {
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [devices, setDevices] = useState<DeviceSession[]>([]);
  const [modalDevice, setModalDevice] = useState<DeviceSession | null>(null);
  const removeDeviceDisclosure = useDisclosure();

  useEffect(() => {
    (async () => {
      await fetchDevices();

      setIsFetchLoading(false);
    })();
  }, []);

  const handleDeviceRemove = (device: DeviceSession) => {
    setModalDevice(device);
    removeDeviceDisclosure.onOpen();
  };

  const fetchDevices = async () => {
    try {
      const result = await CognitoInstance.getSessions();

      const sortedResult = result.sort(
        (
          { isCurrentSession: aIsCurrentSession },
          { isCurrentSession: bIsCurrentSession }
        ) => (aIsCurrentSession && !bIsCurrentSession ? -1 : 1)
      );

      setDevices(sortedResult);
    } catch (error) {
      console.error(error);
    }
  };

  const removeDevice = (device: DeviceSession) => {
    setModalDevice(null);
    const newResult = devices.filter(
      ({ deviceKey }) => deviceKey !== device.deviceKey
    );
    setDevices(newResult);
  };

  if (isFetchLoading) {
    return (
      <Flex pb="4" height="32" justifyContent="center" alignItems="center">
        <Spinner color="brand.600" />
      </Flex>
    );
  }

  if (!devices.length) {
    return (
      <Flex
        pb="4"
        height="64"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <WarningIcon mb="4" w="8" h="8" />
        <Text fontSize="lg" fontWeight="bold" fontStyle="italic" pb="1">
          Error
        </Text>
        <Text>Something unexpected happened</Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex w="full" flexDirection="column">
        {devices.map((device, index) => (
          <DeviceItem
            key={device.deviceKey}
            device={device}
            showBottomBorder={index !== devices.length - 1}
            onRemoveDevice={() => handleDeviceRemove(device)}
          />
        ))}
      </Flex>
      <RemoveDeviceModal
        {...removeDeviceDisclosure}
        device={modalDevice}
        onSuccess={removeDevice}
      />
    </>
  );
}
