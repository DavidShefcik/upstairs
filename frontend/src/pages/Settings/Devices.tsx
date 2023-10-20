import SettingsBox from "../../components/Settings/SettingsBox";
import DeviceList from "./Devices/DeviceList";

export default function DeviceSettings() {
  return (
    <SettingsBox title="Devices" showFooter={false}>
      <DeviceList />
    </SettingsBox>
  );
}
