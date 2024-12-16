import { DashboardRoutes } from "@/types/routes";
import { CalendarClock, Hotel, House, type LucideIcon, Settings2 } from "lucide-react";

type Menu = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
};

export function getSidebarList(pathname: string): Menu[] {
  return [
    {
      title: "Home",
      url: DashboardRoutes.home,
      icon: House,
      isActive: pathname.includes(DashboardRoutes.home),
    },
    {
      title: "Shortlets",
      url: DashboardRoutes.shortlets,
      icon: Hotel,
      isActive: pathname.includes(DashboardRoutes.shortlets),
    },
    {
      title: "Reservations",
      url: DashboardRoutes.reservations,
      icon: CalendarClock,
      isActive: pathname.includes(DashboardRoutes.reservations),
    },
    {
      title: "Settings",
      url: DashboardRoutes.settings,
      icon: Settings2,
      isActive: pathname.includes(DashboardRoutes.settings),
    },
  ];
}
