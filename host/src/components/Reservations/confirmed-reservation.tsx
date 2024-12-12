import { Chip } from "@nextui-org/react";


export type ConfirmedResevartionProps = {
  name: string;
  confirmDate: string;
  reserveNo: string;
  date: string;
  nights: number;
  apartment: string;
  price: string;
}
export default function ConfirmedReservation(props: ConfirmedResevartionProps): JSX.Element {
  return (
    <div className="py-4 px-6 border rounded-xl shadow-sm">
      <div className="space-y-4 flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-lg text-shorttiee_primary font-medium">{props.name}</h3>
          <Chip
            radius="sm"
            size="sm"
            className="text-white bg-shorttiee_primary text-xs font-normal capitalize"
          >
            confirmed on {props.confirmDate}
          </Chip>
        </div>

        <div className="flex justify-between flex-wrap">
          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">Reservation No.</h5>
            <span className="text-sm text-grey_400">{props.reserveNo}</span>
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">Check-in Date</h5>
            <span className="text-sm text-grey_400">{props.date}</span>
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">No. of Nights</h5>
            <span className="text-sm text-grey_400">{props.nights}</span>
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">Apartment</h5>
            <span className="text-sm text-grey_400">{props.apartment}</span>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <h5 className="text-base text-grey_400 font-medium">Total Price</h5>
            <span className="text-sm text-grey_400">{props.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
