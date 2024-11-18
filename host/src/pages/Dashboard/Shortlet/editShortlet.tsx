import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "@/types/routes";

export default function EditShortlet(): JSX.Element {
  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.shortlets}>Shortlets</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Shortlet to edit name</BreadcrumbItem>
      </Breadcrumbs>
      <div>editShortlet</div>
    </div>
  );
}
