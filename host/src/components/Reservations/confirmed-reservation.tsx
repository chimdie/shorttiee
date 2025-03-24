import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import TablePagination from "../TablePagination";
import { ReservationProps } from "./incoming-reservation";
import { calculateNights } from "@/utils";

export default function ConfirmedReservation({
  reservations,
  isLoading,
}: ReservationProps): JSX.Element {
  return (
    <div className="py-8 overflow-x-auto md:overflow-x-visible">
      <Table
        aria-label="confirmed-reservation-table"
        removeWrapper
        bottomContent={
          <div className="flex justify-end">
            <TablePagination />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Reservation No</TableColumn>
          <TableColumn>Check-In</TableColumn>
          <TableColumn>No. of Nights</TableColumn>
          <TableColumn>Apartment</TableColumn>
          <TableColumn>Price</TableColumn>
        </TableHeader>

        <TableBody
          emptyContent={isLoading ? <Spinner size="md" /> : "No confirmed reservation to display."}
        >
          {reservations.map((item) => (
            <TableRow className="bg-white border-y-5 border-grey_100  cursor-pointer" key={item.id}>
              <TableCell>{item?.user?.firstName || ""}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>
                {item.startDate} - {item.endDate}
              </TableCell>
              <TableCell>{calculateNights(item.startDate, item.endDate)}</TableCell>
              <TableCell>{item?.listing?.name || ""}</TableCell>
              <TableCell>{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
