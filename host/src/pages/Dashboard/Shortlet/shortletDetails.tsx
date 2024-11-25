import { DashboardRoutes } from "@/types/routes";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function ShortletDetails() {
  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.shortlets}>Shortlets</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Shortlet name</BreadcrumbItem>
      </Breadcrumbs>
      <div>shortletDetails</div>
    </div>
  );
}
