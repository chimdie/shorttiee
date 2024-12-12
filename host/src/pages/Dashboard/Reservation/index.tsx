import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "@/types/routes";

export default function Reservation(): JSX.Element {
  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.home}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Reservations</BreadcrumbItem>
      </Breadcrumbs>

      <div className="space-y-4">jejeje</div>
    </div>
  );
}
