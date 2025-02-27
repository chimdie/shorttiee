import { Tab, Tabs } from "@heroui/react";
import IncomingReservation from "@/components/Reservations/incoming-reservation";
import ConfirmedReservation from "@/components/Reservations/confirmed-reservation";
import RejectedReservation from "@/components/Reservations/rejected-reservation";
import { useAtomValue } from "jotai";
import { loggedinUserAtom } from "@/atoms/user.atom";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/utils/queryKeys";
import { ApiSDK } from "@/sdk";
import { Hotel } from "lucide-react";

export default function Reservation(): JSX.Element {
  const user = useAtomValue(loggedinUserAtom)
  const userId = user?.data?.id

  const { data: reservationsData, isLoading } = useQuery({
    queryKey: [QueryKeys.reservations, userId],
    queryFn: () => ApiSDK.ReservationService.getApiV1UsersReservations(JSON.stringify([["userId", "eq", userId]])),
    refetchOnMount: false,
  })

  return (
    <>
      {reservationsData?.data.length === 0 ? (
        <div className="flex flex-col justify-center items-center mx-auto h-full">
          <div className="p-4 border rounded-md ">
            <Hotel className="size-12" />
          </div>
          <div className="py-8 md:w-1/2">
            <div className="space-y-4">
              <h3 className="text-shorttiee-primary text-lg md:text-xl font-medium text-center">
                You currently dont have any Reservations
              </h3>
              <p className="text-grey-300 text-sm md:text-base text-center">
                Looks like Clients haven't made any reservations yet.This area will light up with your
                reservations once clients book your shortlets{" "}
              </p>
            </div>
          </div>
        </div>
      ) : (
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
                  <IncomingReservation reservations={[]} isLoading={isLoading} />
                </Tab>

                <Tab key="confirm" title="Confirmed Reservations">
                  <ConfirmedReservation />
                </Tab>

                <Tab key="reject" title="Rejected Reservations">
                  <RejectedReservation />
                </Tab>
            </Tabs >
          </div >
        </div >
      )}

    </>

  );
}
