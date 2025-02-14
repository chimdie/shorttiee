import { Link, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BreadcrumbItem, Breadcrumbs, Chip, Image, Spinner } from "@heroui/react";
import { DashboardRoutes } from "@/types/routes";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/utils/queryKeys";
import { ApiSDK } from "@/sdk";

export default function ShortletDetails() {
  const { id } = useParams();

  const { data: shortletDetail, isLoading } = useQuery({
    queryKey: [QueryKeys.shortletDetail],
    queryFn: () => ApiSDK.ListingService.getApiV1Listings1(id as string),
  });

  const restrictionList = shortletDetail?.data?.restrictions?.split(",").map((item) => item.trim());

  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.shortlets}>Shortlets</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{shortletDetail?.data?.name || ""}</BreadcrumbItem>
      </Breadcrumbs>
      {isLoading ? (
        <Spinner size="md" />
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-shorttiee_primary text-lg font-bold">
              {shortletDetail?.data?.name}
            </h2>
            <div className="flex gap-4">
              <p className="text-shorttiee_primary font-semibold">{shortletDetail?.data?.type}</p>
              <p className="text-sm">
                <span className="text-base text-shorttiee_green-dark font-semibold">
                  #{shortletDetail?.data?.price}
                </span>{" "}
                /night
              </p>
              <Chip
                radius="sm"
                size="sm"
                className="text-shorttiee_yellow-dark bg-shorttiee_yellow-light text-xs font-bold capitalize"
              >
                {shortletDetail?.data?.status}
              </Chip>
            </div>
          </div>
          <div className="w-full py-6  px-12">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {shortletDetail?.data?.images.map((url, index) => (
                  <CarouselItem key={index} className="md:basis-1/3">
                    <div className="p-1">
                      <Image
                        className="w-full rounded-md"
                        alt="shortlet image"
                        src={url}
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

          <div className="py-6 space-y-3">
            <div>
              <h3 className="text-shorttiee_primary text-md font-bold">Address</h3>
              <p className="text-grey_400">{shortletDetail?.data?.address}</p>
            </div>
            <div>
              <h3 className="text-shorttiee_primary text-md font-bold">Rate</h3>
              <p className="text-grey_400">{shortletDetail?.data?.rate}</p>
            </div>
            <div>
              <h3 className="text-shorttiee_primary text-md font-bold">Description</h3>
              <div className="w-3/4 space-y-2">
                <p className="text-grey_400">{shortletDetail?.data?.description}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-shorttiee_primary text-md font-bold">Restrictions</h3>
            <ul className="flex flex-wrap  p-0  list-disc list-inside w-2/6">
              {restrictionList?.map((restriction, index) => (
                <li key={index} className="w-1/2 p-1 text-grey_400">
                  {restriction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
