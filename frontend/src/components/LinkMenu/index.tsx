import { useIsMobile } from "../../hooks/useIsMobile";
import DesktopLinkMenu from "./DesktopLinkMenu";
import MobileLinkMenu from "./MobileLinkMenu";
import { ILinkMenuItem } from "./types";

export default function LinkMenu({ items }: { items: ILinkMenuItem[] }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLinkMenu items={items} />;
  }

  return <DesktopLinkMenu items={items} />;
}
