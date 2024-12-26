import { useRef, useState } from "react";
import {
  Badge,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AddShortletSchema,
  shortletCategory,
  shortletFacilities,
  shortletRestrictions,
  shortletType,
} from "@/schema/shortlet.schema";
import {
  Tag,
  Factory,
  House,
  Images,
  MapPinHouse,
  MapPinned,
  OctagonMinus,
  Speech,
  Tickets,
  TriangleAlert,
  Users,
  Wallet,
  X,
  BedSingle,
  Bath,
  Proportions,
  Link,
} from "lucide-react";

type ShortletModalT = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};
export default function AddShortletModal({
  isOpen,
  onOpenChange,
  onClose,
}: ShortletModalT): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [isLinkInput, setIsLinkInput] = useState<boolean>(false);
  const [linkInputValue, setLinkInputValue] = useState<string>("");

  const form = useForm<AddShortletSchema>({
    resolver: zodResolver(AddShortletSchema),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length + images.length > 8) {
      form.setError("image", {
        type: "manual",
        message: "You can only upload a maximum of 8 images.",
      });
      return;
    }
    form.clearErrors("image");

    const updatedImageArr = [...images, ...files];
    setImages(updatedImageArr);
    form.setValue("image", updatedImageArr);
  };

  const handleRemoveImage = (imageUrl: File) => {
    const updatedImages = images.filter((image) => image !== imageUrl);
    setImages(updatedImages);
    form.setValue("image", updatedImages);
  };

  const onSubmit = (data: AddShortletSchema) => {
    console.log(data);
    onClose();
  };
  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
      <form className="flex flex-col space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add a Shortlet
            <span className="text-sm text-grey_400">
              Fill out the form to get your building listed on Shorttiee
            </span>
          </ModalHeader>
          <ModalBody>
            <Form {...form}>
              <FormField
                control={form.control}
                name="shortletName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        radius="sm"
                        variant="bordered"
                        placeholder="Shortlet Name"
                        type="text"
                        startContent={
                          <House size={16} className="pointer-events-none text-grey_400" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 space-x-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          radius="sm"
                          variant="bordered"
                          placeholder="Shortlet Address"
                          type="text"
                          startContent={
                            <MapPinHouse size={16} className="pointer-events-none text-grey_400" />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          radius="sm"
                          variant="bordered"
                          placeholder="Shortlet Location"
                          type="text"
                          startContent={
                            <MapPinned size={16} className="pointer-events-none text-grey_400" />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        radius="sm"
                        variant="bordered"
                        placeholder="Number of Guests"
                        type="text"
                        startContent={
                          <Users size={16} className="pointer-events-none text-grey_400" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 space-x-4">
                <FormField
                  control={form.control}
                  name="bedroom"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          radius="sm"
                          variant="bordered"
                          placeholder="Number of Bedrooms"
                          type="text"
                          startContent={
                            <BedSingle size={16} className="pointer-events-none text-grey_400" />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathroom"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          radius="sm"
                          variant="bordered"
                          placeholder="Number of Bathrooms"
                          type="text"
                          startContent={
                            <Bath size={16} className="pointer-events-none text-grey_400" />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Textarea
                      {...field}
                      radius="sm"
                      variant="bordered"
                      placeholder="Shortlet Description"
                      startContent={
                        <Speech size={16} className="pointer-events-none text-grey_400 mt-0.5" />
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 space-x-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          radius="sm"
                          variant="bordered"
                          placeholder="Shortlet Price"
                          type="text"
                          startContent={
                            <Wallet size={16} className="pointer-events-none text-grey_400" />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          radius="sm"
                          variant="bordered"
                          placeholder="Shortlet Rate"
                          type="text"
                          startContent={
                            <Tickets size={16} className="pointer-events-none text-grey_400" />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 space-x-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        radius="sm"
                        variant="bordered"
                        placeholder="Shortlet Type"
                        aria-label="type"
                        startContent={
                          <Proportions size={16} className="pointer-events-none text-grey_400" />
                        }
                        classNames={{ popoverContent: "rounded-md" }}
                      >
                        {shortletType.map((type) => (
                          <SelectItem key={type.key}>{type.label}</SelectItem>
                        ))}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        radius="sm"
                        variant="bordered"
                        placeholder="Shortlet Category"
                        aria-label="category"
                        startContent={
                          <Tag size={16} className="pointer-events-none text-grey_400" />
                        }
                        classNames={{ popoverContent: "rounded-md" }}
                      >
                        {shortletCategory.map((cat) => (
                          <SelectItem key={cat.key}>{cat.label}</SelectItem>
                        ))}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 space-x-4">
                <FormField
                  control={form.control}
                  name="facilities"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        radius="sm"
                        variant="bordered"
                        placeholder="Shortlet Facilities"
                        aria-label="facilities"
                        selectionMode="multiple"
                        startContent={
                          <Factory size={16} className="pointer-events-none text-grey_400" />
                        }
                        classNames={{ popoverContent: "rounded-md" }}
                      >
                        {shortletFacilities.map((fac) => (
                          <SelectItem key={fac.key}>{fac.label}</SelectItem>
                        ))}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="restrictions"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        radius="sm"
                        variant="bordered"
                        placeholder="Shortlet Restrictions"
                        aria-label="restrictions"
                        selectionMode="multiple"
                        startContent={
                          <OctagonMinus size={16} className="pointer-events-none text-grey_400" />
                        }
                        classNames={{ popoverContent: "rounded-md" }}
                      >
                        {shortletRestrictions.map((restrict) => (
                          <SelectItem key={restrict.key}>{restrict.label}</SelectItem>
                        ))}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cautionFee"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        radius="sm"
                        variant="bordered"
                        placeholder="Shortlet Caution Fee"
                        type="text"
                        startContent={
                          <TriangleAlert size={16} className="pointer-events-none text-grey_400" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <>
                      {/* empty uploader */}
                      {!isLinkInput && images.length === 0 && (
                        <div className="border-2 border-grey_200 rounded-xl py-8 flex flex-col justify-center items-center w-full">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                            onChange={(e) => {
                              field.onChange(e);
                              handleImageUpload(e);
                            }}
                          />
                          <div className="flex items-center gap-8">
                            <div
                              className="flex flex-col items-center cursor-pointer"
                              onClick={() => fileInputRef?.current?.click()}
                            >
                              <Images size={24} className="pointer-events-none text-grey_400" />
                              <p className="text-grey_400 text-sm py-1">Add shortlet image</p>
                            </div>

                            <div
                              className="flex flex-col items-center cursor-pointer"
                              onClick={() => {
                                setIsLinkInput(!isLinkInput);
                                setLinkInputValue(field.value || "");
                              }}
                            >
                              <Link size={24} className="pointer-events-none text-grey_400" />
                              <p className="text-grey_400 text-sm py-1">Add shortlet image link</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* image preview and upload */}
                      {!isLinkInput && images.length > 0 && (
                        <div className="flex  items-center gap-4 w-full space-y-2">
                          <div
                            className="border-2 border-grey_200 rounded-xl p-4 flex flex-col justify-center items-center cursor-pointer w-20 h-20"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              ref={fileInputRef}
                              onChange={(e) => {
                                field.onChange(e);
                                handleImageUpload(e);
                              }}
                            />
                            <Images size={24} className="pointer-events-none text-grey_400" />
                            <p className="text-grey_400 text-sm py-1">Upload shortlet image</p>
                          </div>

                          {/* preview */}

                          <div className="flex items-center overflow-x-auto gap-2 w-full scroll">
                            {images.map((image, index) => (
                              <div key={index}>
                                <Badge
                                  content={<X size={16} onClick={() => handleRemoveImage(image)} />}
                                  color="default"
                                  size="lg"
                                  className="cursor-pointer p-1.5 bg-white"
                                >
                                  <Image
                                    src={URL.createObjectURL(image)}
                                    alt={`shortletImage ${index + 1}`}
                                    className="rounded-xl w-20 h-20 object-cover"
                                  />
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* textareaa to hold images as links */}
                      {isLinkInput && (
                        <div>
                          <Textarea
                            value={linkInputValue}
                            radius="sm"
                            variant="bordered"
                            placeholder="Links to shortlet images(comma seperated)"
                            startContent={
                              <Link
                                size={16}
                                className="pointer-events-none text-grey_400 mt-0.5"
                              />
                            }
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setLinkInputValue(newValue);
                              field.onChange(newValue);
                            }}
                          />
                        </div>
                      )}
                    </>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Add Shortlet
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
