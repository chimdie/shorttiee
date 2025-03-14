import { useEffect, useState } from "react";
import { Avatar, Badge, BreadcrumbItem, Breadcrumbs, Button, Input, Spinner } from "@heroui/react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { Building2, Camera, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/schema/profile.schema";
import { DashboardRoutes } from "@/types/routes";
import { ApiSDK } from "@/sdk";
import { QueryKeys } from "@/utils/queryKeys";
import { CreateFileDto, UpdateUserDto } from "@/sdk/generated";
import { useToast } from "@/hooks/use-toast";
import { apiErrorParser } from "@/utils/errorParser";

export default function Profile(): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [image, setImage] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(ProfileSchema),
  });

  const { data: user } = useQuery({
    queryKey: [QueryKeys.user],
    queryFn: () => ApiSDK.UserService.getApiV1UsersProfile(),
  });

  useEffect(() => {
    if (user?.data) {
      form.reset({
        firstName: user.data.firstName || "",
        lastName: user.data.lastName || "",
        email: user.data.email || "",
        mobileNumber: user.data.mobileNumber || "",
        address: user.data.address || "",
        businessName: user.data.businessName || "",
        photo: user.data.photo || "",
        gender: user.data.gender as UpdateUserDto["gender"],
      });
    }
  }, [form, user?.data]);

  const updateUserDataMutation = useMutation({
    mutationFn: (userData: UpdateUserDto) => ApiSDK.UserService.patchApiV1UsersProfile(userData),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.user],
      });
      setIsEdit(true);
      toast({
        description: data.message,
      });
    },
    onError(error) {
      setIsEdit(true);
      const parsedError = apiErrorParser(error);
      toast({
        variant: "destructive",
        description: parsedError.message,
      });
    },
  });

  const fileUploadMutation = useMutation({
    mutationFn: (profileImg: CreateFileDto) => ApiSDK.FileService.postApiV1Files(profileImg),
    onSuccess(data) {
      if (data.data[0].path) {
        let uploadedImgPath = data.data[0].path;

        uploadedImgPath = new URL(uploadedImgPath, ApiSDK.OpenAPI.BASE).toString();
        updateUserDataMutation.mutate({ photo: uploadedImgPath });
      }
      setIsEdit(false);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.user],
      });
      toast({
        description: data.message,
      });
    },
    onError(error) {
      const parsedError = apiErrorParser(error);
      toast({
        variant: "destructive",
        description: parsedError.message,
      });
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileDto = { files: [file] };
      const reader = new FileReader();

      reader.onload = (event) => setImage(event.target?.result as string);
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
      fileUploadMutation.mutate(fileDto);
    }
  };

  const onSubmit = (data: ProfileSchema) => {
    updateUserDataMutation.mutate(data);
  };

  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.home}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Account</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col justify-center items-center space-y-6 py-4">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileUpload"
            onChange={handleImageUpload}
          />
          {fileUploadMutation.isPending ? (
            <Spinner size="md" />
          ) : (
            <Badge
              color="default"
              content={
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <Camera className="size-6 text-shorttiee-primary" />
                </label>
              }
              placement="bottom-right"
              isOneChar
            >
              <Avatar
                src={(image as string) || (user?.data?.photo as string)}
                className="w-40 h-40 opacity-100 text-shorttiee-primary aspect-square rounded-full border-red-500"
              />
            </Badge>
          )}
        </div>

        <Form {...form}>
          <form className="flex flex-col space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
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
                        placeholder="First Name"
                        type="text"
                        startContent={
                          <UserRound size={16} className="pointer-events-none text-grey-400" />
                        }
                        isDisabled={isEdit || updateUserDataMutation.isPending}
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
                        startContent={
                          <UserRound size={16} className="pointer-events-none text-grey-400" />
                        }
                        isDisabled={isEdit || updateUserDataMutation.isPending}
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
                      startContent={
                        <Mail size={16} className="pointer-events-none text-grey-400" />
                      }
                      isDisabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      radius="sm"
                      variant="bordered"
                      placeholder="Phone Number"
                      type="text"
                      startContent={
                        <Phone size={16} className="pointer-events-none text-grey-400" />
                      }
                      isDisabled={isEdit || updateUserDataMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="Your Home Address"
                      type="text"
                      startContent={
                        <MapPin size={16} className="pointer-events-none text-grey-400" />
                      }
                      isDisabled={isEdit || updateUserDataMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      radius="sm"
                      variant="bordered"
                      placeholder="Business Name"
                      type="text"
                      startContent={
                        <Building2 size={16} className="pointer-events-none text-grey-400" />
                      }
                      isDisabled={isEdit || updateUserDataMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isEdit ? (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onPress={() => setIsEdit(!isEdit)}
                  isDisabled={updateUserDataMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-shorttiee-primary text-white font-semibold"
                  radius="sm"
                  type="submit"
                  isDisabled={updateUserDataMutation.isPending}
                  isLoading={updateUserDataMutation.isPending}
                >
                  Update
                </Button>
              </div>
            ) : (
              <Button
                className="bg-shorttiee-primary text-white font-semibold w-full"
                radius="sm"
                type="button"
                onPress={() => setIsEdit(false)}
              >
                Edit
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
