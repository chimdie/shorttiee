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
  Progress,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddShortletSchema, shortletRestrictions, shortletType } from "@/schema/shortlet.schema";
import {
  Tag,
  Factory,
  House,
  Images,
  MapPinHouse,
  OctagonMinus,
  Speech,
  Tickets,
  Wallet,
  X,
  Proportions,
  Link,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, CreateFileDto, CreateListingsDto } from "@/sdk/generated";
import { ApiSDK } from "@/sdk";
import { useToast } from "@/hooks/use-toast";
import { QueryKeys } from "@/utils/queryKeys";

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
  const [images, setImages] = useState<string[]>([]);
  const [isLinkInput, setIsLinkInput] = useState<boolean>(false);
  const [linkInputValue, setLinkInputValue] = useState<string[]>([]);
  const [uploadedImgArray, setUploadedImgArray] = useState<string[]>([]);
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data: shortletFacilities } = useQuery({
    queryKey: [QueryKeys.facilities],
    queryFn: () => ApiSDK.FacilityService.getApiV1Facilities(),
  });

  const { data: shortletCategory } = useQuery({
    queryKey: [QueryKeys.categories],
    queryFn: () => ApiSDK.CategoryService.getApiV1Categories(),
  });

  const form = useForm<AddShortletSchema>({
    resolver: zodResolver(AddShortletSchema),
  });

  const uploadImgMutation = useMutation({
    mutationFn: (shortletImgs: CreateFileDto) => ApiSDK.FileService.postApiV1Files(shortletImgs),
    onSuccess(data) {
      let uploadedPaths = data.data.map((file: { path: string }) => file.path);

      uploadedPaths = uploadedPaths.map((e) => {
        const url = new URL(e, ApiSDK.OpenAPI.BASE);
        e = url.toString();
        return e;
      });

      setImages((prevImages) => [...prevImages, ...uploadedPaths]);
      form.setValue("images", [...images, ...uploadedPaths]);
      setUploadedImgArray(uploadedPaths);
      toast({
        description: data.message,
      });
    },
    onError(error) {
      const err = error as ApiError;
      toast({
        variant: "destructive",
        description: err.body.message,
      });
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length + images.length > 8) {
      form.setError("images", {
        type: "manual",
        message: "You can only upload a maximum of 8 images.",
      });
      return;
    }
    form.clearErrors("images");
    uploadImgMutation.mutate({ files });
  };

  const handleRemoveImage = (imageUrl: string) => {
    const updatedImages = images.filter((image) => image !== imageUrl);
    setImages(updatedImages);
    form.setValue("images", updatedImages);
  };

  const addShortletMutation = useMutation({
    mutationFn: (shortletData: CreateListingsDto) =>
      ApiSDK.ListingService.postApiV1Listings(shortletData),
    onSuccess(data) {
      onClose();
      form.reset();
      form.setValue("images", []);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.shortlets],
      });
      toast({
        description: data.message,
      });
    },
    onError(error) {
      const err = error as ApiError;
      toast({
        variant: "destructive",
        description: err.body.message,
      });
    },
  });

  const onSubmit = (data: AddShortletSchema) => {
    const images = uploadedImgArray?.length > 0 ? uploadedImgArray : linkInputValue;

    const parsedData = {
      ...data,
      price: Number(data.price),
      rate: Number(data.rate),
      facilities: data.facilities.split(","),
      images,
    };
    addShortletMutation.mutate(parsedData);
  };

  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
      <Form {...form}>
        <form className="flex flex-col space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Add a Shortlet
              <span className="text-sm text-grey_400">
                Fill out the form to get your building listed on Shorttiee
              </span>
            </ModalHeader>
            <ModalBody>
              <FormField
                control={form.control}
                name="name"
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
                        isDisabled={addShortletMutation.isPending}
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
                        placeholder="Shortlet Address"
                        type="text"
                        startContent={
                          <MapPinHouse size={16} className="pointer-events-none text-grey_400" />
                        }
                        isDisabled={addShortletMutation.isPending}
                      />
                    </FormControl>
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
                          isDisabled={addShortletMutation.isPending}
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
                          isDisabled={addShortletMutation.isPending}
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
                        isDisabled={addShortletMutation.isPending}
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
                  name="categoryId"
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
                        {shortletCategory?.data?.length ? (
                          shortletCategory.data.map((category) => (
                            <SelectItem key={category.id}>{category.name}</SelectItem>
                          ))
                        ) : (
                          <SelectItem isDisabled>No category available</SelectItem>
                        )}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="images"
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
                                setLinkInputValue(
                                  Array.isArray(field.value) &&
                                    field.value.every((item) => typeof item === "string")
                                    ? field.value
                                    : [],
                                );
                              }}
                            >
                              <Link size={24} className="pointer-events-none text-grey_400" />
                              <p className="text-grey_400 text-sm py-1">Add shortlet image link</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* image preview and upload */}
                      {!isLinkInput && uploadImgMutation.isPending ? (
                        <Progress
                          isIndeterminate
                          aria-label="Loading..."
                          className="w-full"
                          size="sm"
                          color="primary"
                        />
                      ) : (
                        <div className="flex  items-center gap-4 w-full space-y-2">
                          {images.length > 0 && (
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
                              <p className="text-grey_400 text-sm py-1">Add Another Image</p>
                            </div>
                          )}
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
                                    src={image}
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
                            value={linkInputValue.join(",")}
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
                              const newArray = newValue.split(",").map((str) => str.trim());
                              setLinkInputValue(newArray);
                              field.onChange(newArray);
                            }}
                            isDisabled={addShortletMutation.isPending}
                          />
                        </div>
                      )}
                    </>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        {shortletFacilities?.data?.length ? (
                          shortletFacilities.data.map((facilities) => (
                            <SelectItem key={facilities.id}>{facilities.name}</SelectItem>
                          ))
                        ) : (
                          <SelectItem isDisabled>No facilities available</SelectItem>
                        )}
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
                        isDisabled={addShortletMutation.isPending}
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
                      isDisabled={addShortletMutation.isPending}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                isLoading={addShortletMutation.isPending}
                isDisabled={uploadImgMutation.isPending || addShortletMutation.isPending}
              >
                Add Shortlet
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Form>
    </Modal>
  );
}
