import { ConfirmedResevartionProps } from "@/components/Reservations/confirmed-reservation";
import { IncomingReservationProps } from "@/components/Reservations/incoming-reservation";
import { RejectedReservationProps } from "@/components/Reservations/rejected-reservation";

export type ShortletT = {
  _id: string;
  name: string;
  type: string;
  location: string;
  price: string;
  status: string;
};

export const shortletData: ShortletT[] = [
  {
    _id: "hehjekeoase",
    name: "Hamptons Lodge",
    type: "Duplex",
    location: "Ikoyi",
    price: "230k",
    status: "active",
  },
  {
    _id: "keiejeuejrde",
    name: "Milan Lodge",
    type: "Party House",
    location: "Ikeja",
    price: "430k",
    status: "pending",
  },
  {
    _id: "hehjekehkrdeoase",
    name: "San Siro",
    type: "Duplex",
    location: "Ajah",
    price: "230k",
    status: "rejected",
  },
  {
    _id: "hkeoase",
    name: "Goodness and mercy",
    type: "Duplex",
    location: "Banana Island",
    price: "230k",
    status: "terminated",
  },
  {
    _id: "hehjekhkkweeoase",
    name: "H Lodge",
    type: "Apartment",
    location: "Ikoyi",
    price: "20k",
    status: "active",
  },
  {
    _id: "lolejjeje",
    name: "GreenVille",
    type: "Duplex",
    location: "Surulele",
    price: "230k",
    status: "active",
  },
  {
    _id: "hehjekeoasedead",
    name: "Stone Castle",
    type: "Duplex",
    location: "Yaba",
    price: "230k",
    status: "pending",
  },
  {
    _id: "hehjekeoajese",
    name: "Patty Jane Lodge",
    type: "Duplex",
    location: "Melrose",
    price: "230k",
    status: "active",
  },
  {
    _id: "hehjekeoderase",
    name: "Tinubu",
    type: "Duplex",
    location: "Ala Hausa",
    price: "230k",
    status: "pending",
  },
  {
    _id: "hehjekeoderease",
    name: "IBB",
    type: "Duplex",
    location: "Ikoyi",
    price: "230k",
    status: "active",
  },
];

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
    nights: 3,
    apartment: "Lakeside Cabin",
    price: "$450.00",
    reason: "Payment not received",
    date: "2023-12-05",
  },
  {
    name: "Emma Thompson",
    rejectDate: "2023-10-06",
    reserveNo: "REJ123457",
    nights: 2,
    apartment: "Urban Loft",
    price: "$300.00",
    reason: "Booking canceled by guest",
    date: "2023-12-05",
  },
  {
    name: "James Taylor",
    rejectDate: "2023-10-11",
    reserveNo: "REJ123458",
    nights: 5,
    apartment: "Coastal Retreat",
    price: "$750.00",
    reason: "Overbooking issue",
    date: "2023-12-05",
  },
  {
    name: "Isabella Martinez",
    rejectDate: "2023-10-15",
    reserveNo: "REJ123459",
    nights: 4,
    apartment: "Mountain Lodge",
    price: "$600.00",
    reason: "Invalid reservation details",
    date: "2023-12-05",
  },
  {
    name: "William Anderson",
    rejectDate: "2023-10-20",
    reserveNo: "REJ123460",
    nights: 1,
    apartment: "City View Suite",
    price: "$200.00",
    reason: "Guest did not meet age requirements",
    date: "2023-12-05",
  },
];
