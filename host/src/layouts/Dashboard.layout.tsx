import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HelmetHeader from "@/components/HelmetHeader";
import { DashboardRoutes } from "@/types/routes";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { Spinner } from "@heroui/spinner";

const dashboardHelmetTitle: Record<DashboardRoutes, { title: string; description: string }> = {
  [DashboardRoutes.home]: {
    title: "Home",
    description: "Welcome to Shorttiee",
  },
  [DashboardRoutes.shortlets]: {
    title: "Shortlets",
    description: "Discover and monitor your shortlets",
  },
  [DashboardRoutes.settings]: {
    title: "Settings",
    description: "Configure and set up your profile",
  },
  [DashboardRoutes.reservations]: {
    title: "Reservations",
    description: "All your reservations in one place",
  },
};

export default function DashboardLayout(): JSX.Element {
  const pathname = useLocation().pathname as DashboardRoutes;
  const { loggedInUser, authToken } = useAuthRedirect({ requireAuth: true });

  const { title, description } = dashboardHelmetTitle[pathname] || {
    title: "Shorttiee",
    description: "Home away from home",
  };

  if (!loggedInUser || !authToken) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }
  return (
    <>
      <HelmetHeader title={title} description={description} />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="#"
                      className="text-base text-shorttiee-primary font-medium"
                    >
                      {title}
                      <p className="text-xs text-grey-300">{description}</p>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
