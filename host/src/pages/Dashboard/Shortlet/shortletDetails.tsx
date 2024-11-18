import { DashboardRoutes } from "@/types/routes";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function ShortletDetails() {
  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem href={DashboardRoutes.shortlets}>Shortlets</BreadcrumbItem>
        <BreadcrumbItem href="">Shortlet name</BreadcrumbItem>
      </Breadcrumbs>
      <div>shortletDetails</div>
    </div>
  );
}
