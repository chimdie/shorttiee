import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import TablePagination from "../TablePagination";
import { confirmedReservations } from "@/dummyData/shortlet";

export default function ConfirmedReservation(): JSX.Element {
  //TODO: import resrvation interface from  incoming reservation file
  //TODO: set props for reservation as done in incoming reservation component
  //TODO: implement reservation query to fetch all reservation
  //TODO: filter through the fetched reservation for reservations with status of confirmed
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
          <TableColumn>Confirmation Date</TableColumn>
          <TableColumn>Check-In</TableColumn>
          <TableColumn>No. of Nights</TableColumn>
          <TableColumn>Apartment</TableColumn>
          <TableColumn>Price</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No reservation to display."}>
          {confirmedReservations.map((item) => (
            <TableRow
              className="bg-white border-y-5 border-grey_100  cursor-pointer"
              key={item.name}
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.reserveNo}</TableCell>
              <TableCell>{item.confirmDate}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.nights}</TableCell>
              <TableCell>{item.apartment}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
