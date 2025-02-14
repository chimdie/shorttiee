import { Tab, Tabs } from "@heroui/react";
import IncomingReservation from "@/components/Reservations/incoming-reservation";
import ConfirmedReservation from "@/components/Reservations/confirmed-reservation";
import RejectedReservation from "@/components/Reservations/rejected-reservation";

export default function Reservation(): JSX.Element {
  return (
    <div className="py-6">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="reservations"
          classNames={{
            tabList: "gap-12 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-shorttiee-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-black text-grey-400 font-bold",
          }}
          variant="underlined"
        >
          <Tab key="incoming" title="Incoming Reservations">
            <IncomingReservation />
          </Tab>

          <Tab key="confirm" title="Confirmed Reservations">
            <ConfirmedReservation />
          </Tab>

          <Tab key="reject" title="Rejected Reservations">
            <RejectedReservation />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
