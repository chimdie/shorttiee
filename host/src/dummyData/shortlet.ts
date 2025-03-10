export type IncomingReservationProps = {
  name: string;
  reserveNo: string;
  date?: string;
  nights?: number;
  apartment: string;
  price?: string;
};

export type ConfirmedResevartionProps = IncomingReservationProps & {
  confirmDate: string;
};

export type RejectedReservationProps = IncomingReservationProps & {
  rejectDate: string;
  reason: string;
};

export const incomingReservations: IncomingReservationProps[] = [
  {
    name: "John Doe",
    reserveNo: "RES123456",
    date: "2023-10-15",
    nights: 3,
    apartment: "Ocean View Suite",
    price: "$450.00",
  },
  {
    name: "Jane Smith",
    reserveNo: "RES123457",
    date: "2023-10-20",
    nights: 2,
    apartment: "Mountain Retreat",
    price: "$300.00",
  },
  {
    name: "Alice Johnson",
    reserveNo: "RES123458",
    date: "2023-11-01",
    nights: 5,
    apartment: "City Center Loft",
    price: "$750.00",
  },
  {
    name: "Bob Brown",
    reserveNo: "RES123459",
    date: "2023-11-10",
    nights: 4,
    apartment: "Cozy Cabin",
    price: "$600.00",
  },
  {
    name: "Charlie Green",
    reserveNo: "RES123460",
    date: "2023-12-05",
    nights: 1,
    apartment: "Beachfront Bungalow",
    price: "$200.00",
  },
];

export const confirmedReservations: ConfirmedResevartionProps[] = [
  {
    name: "Emily White",
    confirmDate: "2023-10-01",
    reserveNo: "CONF123456",
    date: "2023-10-15",
    nights: 3,
    apartment: "Seaside Villa",
    price: "$600.00",
  },
  {
    name: "Michael Black",
    confirmDate: "2023-10-05",
    reserveNo: "CONF123457",
    date: "2023-10-20",
    nights: 2,
    apartment: "Downtown Studio",
    price: "$350.00",
  },
  {
    name: "Sophia Blue",
    confirmDate: "2023-10-10",
    reserveNo: "CONF123458",
    date: "2023-11-01",
    nights: 5,
    apartment: "Luxury Penthouse",
    price: "$1,200.00",
  },
  {
    name: "Liam Gray",
    confirmDate: "2023-10-12",
    reserveNo: "CONF123459",
    date: "2023-11-10",
    nights: 4,
    apartment: "Countryside Cottage",
    price: "$500.00",
  },
  {
    name: "Olivia Red",
    confirmDate: "2023-10-15",
    reserveNo: "CONF123460",
    date: "2023-12-05",
    nights: 1,
    apartment: "Charming Chalet",
    price: "$250.00",
  },
];

export const rejectedReservations: RejectedReservationProps[] = [
  {
    name: "David Wilson",
    rejectDate: "2023-10-02",
    reserveNo: "REJ123456",
    apartment: "Lakeside Cabin",
    reason: "Payment not received",
  },
  {
    name: "Emma Thompson",
    rejectDate: "2023-10-06",
    reserveNo: "REJ123457",
    apartment: "Urban Loft",
    reason: "Booking canceled by guest",
  },
  {
    name: "James Taylor",
    rejectDate: "2023-10-11",
    reserveNo: "REJ123458",
    apartment: "Coastal Retreat",
    reason: "Overbooking issue",
  },
  {
    name: "Isabella Martinez",
    rejectDate: "2023-10-15",
    reserveNo: "REJ123459",
    apartment: "Mountain Lodge",
    reason: "Invalid reservation details",
  },
  {
    name: "William Anderson",
    rejectDate: "2023-10-20",
    reserveNo: "REJ123460",
    apartment: "City View Suite",
    reason: "Guest did not meet age requirements",
  },
];
