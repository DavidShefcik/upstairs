import { useState } from "react";
import { Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

import { CognitoInstance, DeviceSession } from "../../../utils/Cognito";
import DeviceItem from "./DeviceItem";
import RemoveDeviceModal from "../../../components/Modals/RemoveDeviceModal";
import useCachedPromise from "../../../hooks/useCachedPromise";

const fetchDevices = async () => {
  const result = await CognitoInstance.getSessions();

  const sortedResult = result.sort(
    (
      { isCurrentSession: aIsCurrentSession },
      { isCurrentSession: bIsCurrentSession }
    ) => (aIsCurrentSession && !bIsCurrentSession ? -1 : 1)
  );

  return sortedResult;
};

export default function DeviceList() {
  const { isLoading, error, data, updateValue } = useCachedPromise<
    DeviceSession[]
  >("devices", fetchDevices);
  const [modalDevice, setModalDevice] = useState<DeviceSession | null>(null);
  const removeDeviceDisclosure = useDisclosure();

  const handleDeviceRemove = (device: DeviceSession) => {
    setModalDevice(device);
    removeDeviceDisclosure.onOpen();
  };

  const removeDevice = (device: DeviceSession) => {
    setModalDevice(null);
    const newResult = data.filter(
      ({ deviceKey }) => deviceKey !== device.deviceKey
    );
    updateValue(newResult);
  };

  if (isLoading) {
    return (
      <Flex pb="4" height="32" justifyContent="center" alignItems="center">
        <Spinner color="brand.600" />
      </Flex>
    );
  }

  if (!data?.length || error) {
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
        {data.map((device, index) => (
          <DeviceItem
            key={device.deviceKey}
            device={device}
            showBottomBorder={index !== data.length - 1}
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
