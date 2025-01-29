import { useState } from "react";
import { Avatar, Badge, BreadcrumbItem, Breadcrumbs, Button, Input } from "@heroui/react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "@/types/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/schema/profile.schema";
import { Building2, Camera, Mail, MapPin, Phone, UserRound } from "lucide-react";

export default function Profile(): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(true);

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(ProfileSchema),
  });

  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.home}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Account</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col justify-center items-center space-y-6 py-4">
        <div>
          <Badge
            color="default"
            content={<Camera className="cursor-pointer size-12 text-shorttiee_primary" />}
            placement="bottom-right"
            isOneChar
          >
            <Avatar
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              className="w-40 h-40 text-large"
            />
          </Badge>
        </div>

        <Form {...form}>
          <form className="flex flex-col space-y-7">
            <div className="grid grid-cols-2 space-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        radius="sm"
                        variant="bordered"
                        placeholder="Last Name"
                        type="text"
                        defaultValue="Tunde"
                        startContent={
                          <UserRound size={16} className="pointer-events-none text-grey_400" />
                        }
                        isDisabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        radius="sm"
                        variant="bordered"
                        placeholder="Last Name"
                        type="text"
                        defaultValue="Musa"
                        startContent={
                          <UserRound size={16} className="pointer-events-none text-grey_400" />
                        }
                        isDisabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      radius="sm"
                      variant="bordered"
                      placeholder="Email"
                      type="email"
                      defaultValue="tundeeeLargartha@bjorn.ironside"
                      startContent={
                        <Mail size={16} className="pointer-events-none text-grey_400" />
                      }
                      isDisabled={isEdit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      radius="sm"
                      variant="bordered"
                      placeholder="Phone Number"
                      type="text"
                      defaultValue="90923439993"
                      startContent={
                        <Phone size={16} className="pointer-events-none text-grey_400" />
                      }
                      isDisabled={isEdit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="home"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      radius="sm"
                      variant="bordered"
                      placeholder="Your Home Address"
                      defaultValue="Alausa quaters ikoyi lagos"
                      type="text"
                      startContent={
                        <MapPin size={16} className="pointer-events-none text-grey_400" />
                      }
                      isDisabled={isEdit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bussinessName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      radius="sm"
                      variant="bordered"
                      placeholder="Business Name (Optional)"
                      type="text"
                      startContent={
                        <Building2 size={16} className="pointer-events-none text-grey_400" />
                      }
                      isDisabled={isEdit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="bg-shorttiee_primary text-white font-semibold"
              radius="sm"
              onPress={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "Edit" : "Save"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
