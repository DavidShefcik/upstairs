import { Text } from "@chakra-ui/react";

import SettingsBox from "../../../components/Settings/SettingsBox";

export default function SettingsAccountDetailsForm() {
  const handleSubmit = () => {};
  const handleReset = () => {};

  return (
    <SettingsBox
      title="Account Details"
      isLoading={false}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Text>Password</Text>
    </SettingsBox>
  );
}
