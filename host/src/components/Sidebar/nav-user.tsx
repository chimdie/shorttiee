import { Bell, ChevronsUpDown, LogOut, Settings2, UserPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useDisclosure } from "@heroui/react";
import { DashboardRoutes } from "@/types/routes";
import LogoutModal from "../LogoutModal";
import { ApiSDK } from "@/sdk";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/utils/queryKeys";
import { getNameIntials } from "@/utils";

export function NavUser() {
  const { isMobile } = useSidebar();

  const logout = useDisclosure();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: [QueryKeys.user],
    queryFn: () => ApiSDK.UserService.getApiV1UsersProfile(),
  });

  console.log("hpoe", user?.data?.photo);

  const fullName = [user?.data?.firstName, user?.data?.lastName].filter(Boolean).join(" ");

  return (
    <>
      {isUserLoading ? null : (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.data?.photo as string} alt={fullName} />
                    <AvatarFallback className="rounded-lg uppercase">
                      {getNameIntials(fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold capitalize">{fullName}</span>
                    <span className="truncate text-xs">{user?.data?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    {/* <Avatar showFallback src={user?.data?.photo as string} /> */}

                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.data?.photo as string} alt={fullName} />
                      <AvatarFallback className="rounded-lg uppercase">
                        {getNameIntials(fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold capitalize">{fullName}</span>
                      <span className="truncate text-xs">{user?.data?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to={DashboardRoutes.account}>
                    <DropdownMenuItem>
                      <UserPen />
                      Account
                    </DropdownMenuItem>
                  </Link>

                  <Link to={DashboardRoutes.notifications}>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </Link>

                  <Link to={DashboardRoutes.settings}>
                    <DropdownMenuItem>
                      <Settings2 />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout.onOpen}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      )}
      <LogoutModal
        isOpen={logout.isOpen}
        onClose={logout.onClose}
        onOpenChange={logout.onOpenChange}
      />
    </>
  );
}
