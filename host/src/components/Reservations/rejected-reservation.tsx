import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import TablePagination from "../TablePagination";
import { rejectedReservations } from "@/dummyData/shortlet";

export default function RejectedReservation(): JSX.Element {
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
          <TableColumn>Reject Date</TableColumn>
          <TableColumn>Apartment</TableColumn>
          <TableColumn>Reason</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No reservation to display."}>
          {rejectedReservations.map((item) => (
            <TableRow
              className="bg-white border-y-5 border-grey_100  cursor-pointer"
              key={item.name}
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.reserveNo}</TableCell>
              <TableCell>{item.rejectDate}</TableCell>
              <TableCell>{item.apartment}</TableCell>
              <TableCell>{item.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
