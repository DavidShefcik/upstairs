import SettingsBox from "../../../../components/Settings/SettingsBox";
import { useSession } from "../../../../context/AuthenticationState";
import EnableTwoFactorAuth from "./EnableTwoFactorAuth";
import ManageTwoFactorAuth from "./ManageTwoFactorAuth";

export default function TwoFactorAuthSettings() {
  const { session } = useSession();

  return (
    <SettingsBox title="Multi Factor Authentication" showFooter={false}>
      {session.user.mfaEnabled ? (
        <ManageTwoFactorAuth />
      ) : (
        <EnableTwoFactorAuth />
      )}
    </SettingsBox>
  );
}
