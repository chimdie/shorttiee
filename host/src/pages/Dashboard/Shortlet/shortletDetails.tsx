import { DashboardRoutes } from "@/types/routes";
import { Link } from "react-router-dom";
import { BreadcrumbItem, Breadcrumbs, Chip } from "@nextui-org/react";
import { AirVent, Bath, BedDouble, CookingPot, House, type LucideIcon } from "lucide-react";

type DetailCardT = {
  icon: LucideIcon;
  text: string;
};

const detailsArr: DetailCardT[] = [
  { icon: House, text: "Duplex" },
  { icon: BedDouble, text: "1 Bedroom" },
  { icon: Bath, text: "1 Bathroom" },
  { icon: CookingPot, text: "2 Kitchen" },
  { icon: AirVent, text: "Airvents" },
]


const DetailCard = ({ icon: Icon, text }: DetailCardT) => {
  return (
    <div className="border border-grey_300 p-4 rounded-md shadow-sm flex flex-col items-center justify-center space-y-2 min-w-28 h-28">
      <Icon />
      <p>{text}</p>
    </div>
  );
};

export default function ShortletDetails() {
  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.shortlets}>Shortlets</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Shortlet name</BreadcrumbItem>
      </Breadcrumbs>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-shorttiee_primary text-lg font-bold">Apartment Name</h2>
          <div className="flex gap-4">
            <p>Duplex</p>
            <Chip
              radius="sm"
              size="sm"
              className="text-shorttiee_yellow-dark bg-shorttiee_yellow-light text-xs font-normal capitalize"
            >
              pending
            </Chip>
          </div>
        </div>
        <div>images here</div>
        <div className="space-y-3">
          <h3 className="text-shorttiee_primary text-md font-bold">Details</h3>
          <div className="flex gap-4">
            {detailsArr.map((details, index) => (
              <DetailCard key={index} icon={details.icon} text={details.text} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-shorttiee_primary text-md font-bold">Description</h3>
          <div className="w-3/4 space-y-2">
            <p className="text-grey_400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est assumenda voluptate
              accusamus vitae! Labore aliquid quia consectetur asperiores esse iste fugit at natus
              consequatur veniam nemo, quos ad! Soluta, obcaecati!
            </p>
            <p className="text-grey_400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est assumenda voluptate
              accusamus vitae! Labore aliquid quia consectetur asperiores esse iste fugit at natus
              consequatur veniam nemo, quos ad! Soluta, obcaecati!
            </p>
            <p className="text-grey_400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est assumenda voluptate
              accusamus vitae! Labore aliquid quia consectetur asperiores esse iste fugit at natus
              consequatur veniam nemo, quos ad! Soluta, obcaecati!
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-shorttiee_primary text-md font-bold">Facilities and Add Ons</h3>

        </div>
        shortletDetails
      </div>
    </div>
  );
}
