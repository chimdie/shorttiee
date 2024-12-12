import { Button, Chip } from "@nextui-org/react";

export default function IncomingReservation(): JSX.Element {
  return (
    <div className="py-4 px-6 border rounded-xl shadow-sm">
      <div className="space-y-4 flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-lg text-shorttiee_primary font-medium">Name of Tenant</h3>
          <Chip
            radius="sm"
            size="sm"
            className="text-shorttiee_green-dark bg-shorttiee_green-light text-xs font-normal capitalize"
          >
            waiting for confirmation
          </Chip>
        </div>

        <div className="flex justify-between flex-wrap">
          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">Reservation No.</h5>
            <span className="text-sm text-grey_400">teer3hh3h3</span>
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">Check-in Date</h5>
            <span className="text-sm text-grey_400">16:00, 12/12/23</span>
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">No. of Nights</h5>
            <span className="text-sm text-grey_400">4</span>
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">Apartment</h5>
            <span className="text-sm text-grey_400">Patty Jane Lodge</span>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">Total Price</h5>
            <span className="text-sm text-grey_400">$500</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6 justify-end pt-4">
        <Button className="bg-shorttiee_red-dark text-white" size="sm" radius="sm">
          Reject
        </Button>
        <Button className="bg-shorttiee_primary text-white" size="sm" radius="sm">
          Accept
        </Button>
      </div>
    </div>
  );
}
