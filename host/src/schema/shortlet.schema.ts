import { z } from "zod";

export const shortletType = [
  { key: "SHORTLET", label: "Shortlet" },
  { key: "RENTAL", label: "Rental" },
  { key: "SALE", label: "Sale" },
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
  name: z
    .string({ message: "Shortlet Name is required" })
    .min(2, { message: "Shortlet Name is required" }),
  address: z.string({ message: "Address is required" }),
  type: z.enum(["SHORTLET", "RENTAL", "SALE"], {
    message: "Type is required and must be either SHORTLET, RENTAL, or SALE",
  }),
  images: z
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
  categoryId: z.string({ message: "Category is required" }),
  facilities: z
    .array(z.string(), {
      message: "Select at least one facility",
    })
    .min(1, "Select at least one facility"),
  restrictions: z.string({ message: "Select atleast one restrictions" }),
});

export type AddShortletSchema = z.infer<typeof AddShortletSchema>;
