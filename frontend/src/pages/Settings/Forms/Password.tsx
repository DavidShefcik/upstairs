import { Text } from "@chakra-ui/react";

import SettingsBox from "../../../components/Settings/SettingsBox";

export default function SettingsPasswordForm() {
  const handleSubmit = () => {};
  const handleReset = () => {};

  return (
    <SettingsBox
      title="Change Password"
      isLoading={false}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Text>Password</Text>
    </SettingsBox>
  );
}
