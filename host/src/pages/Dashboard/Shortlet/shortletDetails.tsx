
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BreadcrumbItem, Breadcrumbs, Chip, Image } from "@nextui-org/react";
import { AirVent, Bath, BedDouble, CookingPot, House, type LucideIcon } from "lucide-react";
import { DashboardRoutes } from "@/types/routes";

type DetailCard = {
  icon: LucideIcon;
  text: string;
};

const detailsArr: DetailCard[] = [
  { icon: House, text: "Duplex" },
  { icon: BedDouble, text: "1 Bedroom" },
  { icon: Bath, text: "1 Bathroom" },
  { icon: CookingPot, text: "2 Kitchen" },
  { icon: AirVent, text: "Airvents" },
];

const DetailCard = ({ icon: Icon, text }: DetailCard) => {
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
            <p className="text-shorttiee_primary font-semibold">Duplex</p>
            <p className="text-sm">
              <span className="text-base text-shorttiee_green-dark font-semibold">$40k</span> /night
            </p>
            <Chip
              radius="sm"
              size="sm"
              className="text-shorttiee_yellow-dark bg-shorttiee_yellow-light text-xs font-normal capitalize"
            >
              pending
            </Chip>
          </div>
        </div>
        <div className="w-full  px-12">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3">
                  <div className="p-1">
                    <Image
                      className="w-full rounded-md"
                      alt="shortlet image"
                      src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      fallbackSrc="https://via.placeholder.com/300x200"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
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
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <p key={index} className="text-grey_400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est assumenda voluptate
                  accusamus vitae! Labore aliquid quia consectetur asperiores esse iste fugit at
                  natus consequatur veniam nemo, quos ad! Soluta, obcaecati!
                </p>
              ))}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-shorttiee_primary text-md font-bold">Facilities and Add Ons</h3>
          <ul className="flex flex-wrap  p-0  list-disc list-inside w-2/6">
            {Array(12)
              .fill(null)
              .map((_, index) => (
                <li key={index} className="w-1/2 p-1 text-grey_400">
                  Drivers
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}