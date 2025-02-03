import { useEffect, useState } from "react";
import { Avatar, Badge, BreadcrumbItem, Breadcrumbs, Button, Input, Spinner } from "@heroui/react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "@/types/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/schema/profile.schema";
import { Building2, Camera, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { ApiSDK } from "@/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/utils/queryKeys";
import { ApiError, CreateFileDto, UpdateUserDto } from "@/sdk/generated";
import { useToast } from "@/hooks/use-toast";


export default function Profile(): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [image, setImage] = useState<string | null>(null)
  const [_, setSelectedFile] = useState<CreateFileDto | null>(null)
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      address: "",
      bussinessName: "",
      photo: ""
    }
  });

  const { data: user } = useQuery({
    queryKey: [QueryKeys.user],
    queryFn: () => ApiSDK.UserService.getApiV1UsersProfile(),
    enabled: true
  })


  useEffect(() => {
    if (user?.data) {
      form.reset({
        firstName: user.data.firstName || "",
        lastName: user.data.lastName || "",
        email: user.data.email || "",
        mobileNumber: user.data.mobileNumber || "",
        address: user.data.address || "",
        bussinessName: user.data.businessName || "",
        photo: user.data.photo || ""
      })
    }
  }, [form, user?.data])


  const uploadProfileImgMutation = useMutation({
    mutationFn: (profileImg: CreateFileDto) => ApiSDK.FileService.postApiV1Files(profileImg),
    onSuccess(data) {

      const uploadedImgPath = data.data[0].path
      setUploadedImagePath(uploadedImgPath)

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.user]
      })
      toast({
        description: data.message
      })
    },
    onError(error) {
      const err = error as ApiError
      toast({
        variant: "destructive",
        description: err.body.message
      })
    }
  })


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileDto = { files: [file] }
      setSelectedFile(fileDto)

      const reader = new FileReader()
      reader.onload = (event) => setImage(event.target?.result as string)
      reader.readAsDataURL(file)
      uploadProfileImgMutation.mutate(fileDto)
    }
  }


  const updateUserDataMutation = useMutation({
    mutationFn: (userData: UpdateUserDto) => ApiSDK.UserService.patchApiV1UsersProfile(userData),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.user]
      })
      toast({
        description: data.message
      })
    },
    onError(error) {
      const err = error as ApiError
      toast({
        variant: "destructive",
        description: err.body.message
      })
    }
  })

  const onSubmit = (data: ProfileSchema) => {
    const updatedData = {
      ...data,
      photo: uploadedImagePath || user?.data?.photo || ""
    }
    updateUserDataMutation.mutate(updatedData)
  }


  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.home}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Account</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col justify-center items-center space-y-6 py-4">
        <div >
          <input type="file" accept="image/*" className="hidden" id="fileUpload" onChange={handleImageUpload} />
          {uploadProfileImgMutation.isPending ? (<Spinner size="md" />) : (
          <Badge
            color="default"
            content={
              <label htmlFor="fileUpload" className="cursor-pointer">
                <Camera className="size-6 text-shorttiee_primary" />
              </label>
            }
            placement="bottom-right"
            isOneChar
          >
              <Avatar
              src={image as string || user?.data?.photo as string}
              className="w-40 h-40 opacity-100 text-shorttiee_primary"
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
                          <UserRound size={16} className="pointer-events-none text-grey_400" />
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
                          <UserRound size={16} className="pointer-events-none text-grey_400" />
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
                        <Mail size={16} className="pointer-events-none text-grey_400" />
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
                        <Phone size={16} className="pointer-events-none text-grey_400" />
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
                        <MapPin size={16} className="pointer-events-none text-grey_400" />
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
              name="bussinessName"
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
                        <Building2 size={16} className="pointer-events-none text-grey_400" />
                      }
                      isDisabled={isEdit || updateUserDataMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {isEdit ? (
              <Button
                className="bg-shorttiee_primary text-white font-semibold"
                radius="sm"
                onPress={() => setIsEdit(!isEdit)}
              >
                Edit
              </Button>
            ) : (
              <Button
                className="bg-shorttiee_primary text-white font-semibold"
                radius="sm"
                type="submit"
                isDisabled={updateUserDataMutation.isPending}
                isLoading={updateUserDataMutation.isPending}
              >
                Update
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
