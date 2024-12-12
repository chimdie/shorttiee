import { BreadcrumbItem, Breadcrumbs, Tab, Tabs } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "@/types/routes";
import IncomingReservation from "@/components/Reservations/incoming-reservation";
import ConfirmedReservation from "@/components/Reservations/confirmed-reservation";
import RejectedReservation from "@/components/Reservations/rejected-reservation";
import TablePagination from "@/components/TablePagination";
import {
  confirmedReservations,
  incomingReservations,
  rejectedReservations,
} from "@/dummyData/shortlet";

export default function Reservation(): JSX.Element {
  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.home}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Reservations</BreadcrumbItem>
      </Breadcrumbs>

      <div className="space-y-4">
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="reservations"
            classNames={{
              tabList: "gap-12 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-shorttiee_primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-black text-grey_400 font-bold",
            }}
            variant="underlined"
          >
            <Tab key="incoming" title="Incoming Reservations">
              <div className="py-2 space-y-5">
                {incomingReservations.map((incoming) => (
                  <IncomingReservation
                    key={incoming.name}
                    name={incoming.name}
                    reserveNo={incoming.reserveNo}
                    date={incoming.date}
                    nights={incoming.nights}
                    apartment={incoming.apartment}
                    price={incoming.price}
                  />
                ))}
              </div>
              <div className="py-4 flex justify-end">
                <TablePagination />
              </div>
            </Tab>

            <Tab key="confirm" title="Confirmed Reservation">
              <div className="p-2 space-y-5">
                {confirmedReservations.map((confirmed) => (
                  <ConfirmedReservation
                    key={confirmed.name}
                    name={confirmed.name}
                    confirmDate={confirmed.confirmDate}
                    reserveNo={confirmed.reserveNo}
                    date={confirmed.date}
                    nights={confirmed.nights}
                    apartment={confirmed.apartment}
                    price={confirmed.price}
                  />
                ))}
              </div>
              <div className="py-4 flex justify-end">
                <TablePagination />
              </div>
            </Tab>

            <Tab key="reject" title="Rejected Reservation">
              <div className="p-2 space-y-5">
                {rejectedReservations.map((rejected) => (
                  <RejectedReservation
                    key={rejected.name}
                    name={rejected.name}
                    rejectDate={rejected.rejectDate}
                    reserveNo={rejected.reserveNo}
                    nights={rejected.nights}
                    apartment={rejected.apartment}
                    price={rejected.price}
                    reason={rejected.reason}
                    date={rejected.date}
                  />
                ))}
              </div>
              <div className="py-4 flex justify-end">
                <TablePagination />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
