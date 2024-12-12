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

export type IncomingReservationI = {
  name: string;
  reserveNo: string;
  date: string;
  nights: number;
  apartment: string;
  price: string;
};

export const incomingReservations: IncomingReservationI[] = [
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
