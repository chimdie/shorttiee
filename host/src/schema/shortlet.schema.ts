import { z } from "zod";

export const shortletType = [
  { key: "shortlet", label: "Shortlet" },
  { key: "rental", label: "Rental" },
  { key: "sale", label: "Sale" },
];

export const shortletCategory = [
  { key: "apartment", label: "Apartment" },
  { key: "beach villa", label: "Beach Villa" },
  { key: "vacation home", label: "Vacation Home" },
  { key: "duplex", label: "Duplex" },
  { key: "party home", label: "Party Home" },
  { key: "studio apartment", label: "Studio Apartment" },
];

export const shortletFacilities = [
  { key: "cook", label: "Cook/Chef" },
  { key: "driver", label: "Driver" },
  { key: "ac", label: "Air Conditioner" },
  { key: "ps5", label: "PS5" },
  { key: "swimming pool", label: "Swimming Pool" },
  { key: "power supply", label: "Power Supply" },
  { key: "gym", label: "Gym" },
  { key: "elevator", label: "Elevator" },
  { key: "wifi", label: "WiFi" },
  { key: "parking", label: "Parking" },
  { key: "meeting room", label: "Meeting Room" },
  { key: "Resturant", label: "Resturant" },
  { key: "cleaner", label: "Cleaner" },
  { key: "spa", label: "SPA Servive" },
  { key: "laundry", label: "Laundry" },
];

export const shortletRestrictions = [
  { key: "kids", label: "No Kids" },
  { key: "smoking", label: "No Smoking" },
  { key: "filming", label: "No Filming" },
  { key: "parites", label: "No Parties" },
  { key: "pets", label: "No Pets" },
];

export const AddShortletSchema = z.object({
  shortletName: z
    .string({ message: "Shortlet Name is required" })
    .min(2, { message: "Shortlet Name is required" }),
  address: z.string({ message: "Address is required" }),
  guests: z.string({ message: "Number of guests is required" }),
  bedroom: z.string({ message: "Number of bedroom is required" }),
  bathroom: z.string({ message: "Number of bathroom is required" }),
  location: z.string({ message: "Location is required" }),
  image: z
    .union([
      z
        .array(z.instanceof(File))
        .min(1, { message: "Upload at least one image file" })
        .refine((files) => files.every((file) => file.type.startsWith("image/")), {
          message: "All files must be image files",
        }),
      z.array(z.string()).min(1, { message: "Enter valid urls" }),
    ])
    .refine(
      (data) =>
        data.every((item) => typeof item === "string") ||
        data.every((item) => item instanceof File),
      { message: "You must upload only image files or enter the links to the image(s), not both" },
    ),
  description: z.string({ message: "Description is required" }),
  price: z.string({ message: "Price is required" }),
  rate: z.string({ message: "Rate is required" }),
  type: z.string({ message: "Type is required" }),
  category: z.string({ message: "Category is required" }),
  cautionFee: z.string({ message: "Caution Fee is required" }),
  facilities: z.string({ message: "Select atleast one facility" }),
  restrictions: z.string({ message: "Select atleast one restrictions" }),
});

export type AddShortletSchema = z.infer<typeof AddShortletSchema>;
