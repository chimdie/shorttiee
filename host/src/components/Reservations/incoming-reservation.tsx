import { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  Spinner,
} from "@heroui/react";
import TablePagination from "../TablePagination";
import { EllipsisVertical } from "lucide-react";
import AcceptReservationModal from "./accept-reservation-modal";
import RejectReservationModal from "./reject-reservation-modal";
import { calculateNights } from "@/utils";

export interface ReservationProps {
  reservations: {
    id: string;
    code: string;
    amount: number;
    startDate: string;
    endDate: string;
    name: string;
    apartment: string;
  }[];
  isLoading: boolean;
}

export default function IncomingReservation({ reservations, isLoading }: ReservationProps): JSX.Element {
  const acceptReservation = useDisclosure();
  const rejectReservation = useDisclosure();
  const [reservationId, setReservationId] = useState<string | null>(null);
  return (
    <>
      <div className="py-8 overflow-x-auto md:overflow-x-visible">
        <Table
          aria-label="incoming-reservation-table"
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
            <TableColumn>Actions</TableColumn>
          </TableHeader>

          <TableBody
            emptyContent={isLoading ? <Spinner size="md" /> : "No reservation to display."}
          >
            {reservations.map((item) => (
              <TableRow
                className="bg-white border-y-5 border-grey_100  cursor-pointer"
                key={item.id}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.startDate} -  {item.endDate}</TableCell>
                <TableCell>{calculateNights(item.startDate, item.endDate)}</TableCell>
                <TableCell>{item.apartment}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <EllipsisVertical className="text-xs cursor-pointer" />
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Shortlet Table Actions">
                        <DropdownItem
                          key="accept"
                          onPress={() => {
                            if (item.id) {
                              setReservationId(item.id);
                              acceptReservation.onOpen();
                            }
                          }}
                        >
                          Accept
                        </DropdownItem>
                        <DropdownItem
                          key="reject"
                          className="text-danger"
                          color="danger"
                          onPress={() => {
                            if (item.id) {
                              setReservationId(item.id);
                              rejectReservation.onOpen();
                            }
                          }}
                        >
                          Reject
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {reservationId ? (
        <AcceptReservationModal
          isOpen={acceptReservation.isOpen}
          onClose={acceptReservation.onClose}
          onOpenChange={acceptReservation.onOpenChange}
          id={reservationId}
        />
      ) : null}

      {reservationId ? (
        <RejectReservationModal
          isOpen={rejectReservation.isOpen}
          onClose={rejectReservation.onClose}
          onOpenChange={rejectReservation.onOpenChange}
          id={reservationId}
        />
      ) : null}
    </>
  );
}
