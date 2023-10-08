import { IconType } from "react-icons";

export interface ILinkMenuLink {
  title: string;
  icon: IconType;
  path: string;
  type?: "link";
}
interface ILinkMenuDivider {
  type: "divider";
}
export type ILinkMenuItem = ILinkMenuLink | ILinkMenuDivider;
