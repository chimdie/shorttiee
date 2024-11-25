import {
  Button,
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
import { AddShortletSchema, shortletCategory, shortletFacilities, shortletRestrictions, shortletType } from "@/schema/shortlet.schema";
import { Factory, House, MapPinHouse, MapPinned, OctagonMinus, Speech, Tickets, TriangleAlert, TypeOutline, Users, Wallet } from "lucide-react";
import { Tag } from "iconsax-react";

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
  const form = useForm<AddShortletSchema>({
    resolver: zodResolver(AddShortletSchema),
  });

  const onSubmit = (data: AddShortletSchema) => {
    console.log(data);
    onClose()
  };
  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
      <form className="flex flex-col space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
      <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add a Shortlet
            <span className="text-sm text-grey_400">Fill out the form to get your building listed on Shorttiee</span>
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
                            <Tickets size={16} className="pointer-events-none text-grey_400" />
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
                      placeholder="Shortlet Describtion"
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
                          <TypeOutline size={16} className="pointer-events-none text-grey_400" />
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

            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" type="submit">
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
      </form>
    </Modal>
  );
}
