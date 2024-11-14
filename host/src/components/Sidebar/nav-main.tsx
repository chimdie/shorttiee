import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { getSidebarList } from "./data";

export function NavMain() {
  const pathname = useLocation().pathname;
  const items = getSidebarList(pathname);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title} asChild className="py-6 px-4">
              <Link
                to={item.url}
                className={`font-medium ${item.isActive ? "bg-shorttiee_primary text-white" : ""}`}
              >
                {item.icon && <item.icon />}
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
