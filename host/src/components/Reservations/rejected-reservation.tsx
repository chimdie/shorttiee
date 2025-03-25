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

export default function RejectedReservation({
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
          <TableColumn>Apartment</TableColumn>
        </TableHeader>

        <TableBody
          emptyContent={isLoading ? <Spinner size="md" /> : "No  rejected reservation to display."}
        >
          {reservations.map((item) => (
            <TableRow
              className="bg-white border-y-5 border-grey_100  cursor-pointer"
              key={item?.id}
            >
              <TableCell>{item?.customerName || ""}</TableCell>
              <TableCell>{item.code || ""}</TableCell>
              <TableCell>{item?.apartmentName || ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
