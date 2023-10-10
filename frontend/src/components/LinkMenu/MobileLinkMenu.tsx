import Select from "../Select";
import { ILinkMenuItem } from "./types";
import { useLocation, useNavigate } from "react-router-dom";

export default function MobileLinkMenu({ items }: { items: ILinkMenuItem[] }) {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(
    items.map((item) =>
      item.type === "divider" ? null : (
        <option key={item.path} value={item.path}>
          {item.title}
        </option>
      )
    )
  );

  return (
    <Select
      value={location.pathname}
      onChange={(event) => navigate(event.target.value)}
    >
      {items.map((item) =>
        item.type === "divider" ? null : (
          <option key={item.path} value={item.path}>
            {item.title}
          </option>
        )
      )}
    </Select>
  );
}
