import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { EllipsisVertical, Hotel, Search } from "lucide-react";
import AddShortletModal from "@/components/Shortlet/add-shortlet-modal";
import TablePagination from "@/components/TablePagination";
import DeleteShortletModal from "@/components/Shortlet/delete-shortlet-modal";
import { DashboardRoutes } from "@/types/routes";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/utils/queryKeys";
import { ApiSDK } from "@/sdk";
import { ListingsDto } from "@/sdk/generated";
import { useAtomValue } from "jotai";
import { loggedinUserAtom } from "@/atoms/user.atom";


const statusTheme = {
  active: "text-shorttiee_green-dark bg-shorttiee_green-light",
  pending: "text-shorttiee_yellow-dark bg-shorttiee_yellow-light",
  rejected: "text-shorttiee_red-dark bg-shorttiee_red-light",
  terminated: "text-grey_300 bg-grey_200",
};

export default function Shortlet(): JSX.Element {
  const [isShortlet] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [shortletId, setShortletId] = useState<string | null>(null);
  const user = useAtomValue(loggedinUserAtom)

  console.log(user);


  const addShortletModal = useDisclosure();
  const deleteShortletModal = useDisclosure();

  const navigate = useNavigate();

  const { data: shortletData, isLoading } = useQuery({
    queryKey: [QueryKeys.shortlets],
    //   queryFn: () => ApiSDK.ListingService.getApiV1Listings(`filter=${encodeURIComponent(JSON.stringify([["userId", "eq", "5802bb26-f58e-47c6-a630-1072be823cab"]])))
    // }`),
    //   queryFn: () =>
    //     ApiSDK.ListingService.getApiV1Listings(`filter=${encodeURIComponent(JSON.stringify([["userId", "eq", "5802bb26-f58e-47c6-a630-1072be823cab"]])))
    // }`)
    // queryFn: () => ApiSDK.ListingService.getApiV1Listings({
    //   filter: JSON.stringify([["userId", "eq", "5802bb26-f58e-47c6-a630-1072be823cab"]])
    // }),
    queryFn: () => ApiSDK.ListingService.getApiV1Listings(
      `filter=${encodeURIComponent(JSON.stringify([["userId", "eq", user?.data?.id]]))}`
    ),
    refetchOnMount: false,
  })

  const filteredShortlets = shortletData?.data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()),
  ) || [];

  const getStatusClass = (status: string) => {
    return Object.keys(statusTheme).find((key) => status.includes(key))
      ? statusTheme[status as keyof typeof statusTheme]
      : statusTheme.terminated;
  };
  return (
    <>
      {isShortlet ? (
        <div className="flex flex-col justify-center items-center mx-auto h-full">
          <div className="p-4 border rounded-md ">
            <Hotel className="size-12" />
          </div>
          <div className="py-8 md:w-1/2">
            <div className="space-y-4">
              <h3 className="text-shorttiee_primary text-lg md:text-xl font-medium text-center">
                You currently dont have any Shortlets Listed
              </h3>
              <p className="text-grey_300 text-sm md:text-base text-center">
                Looks like you haven't added any shortlets yet.This area will light up with your
                shortlets once you list or add them{" "}
              </p>
            </div>
          </div>
          <div>
            <Button
              className="bg-shorttiee_primary text-white font-medium w-full"
              onPress={addShortletModal.onOpen}
            >
              Add a Shortlet
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="py-6 space-y-6">
            <div className="flex  justify-between items-center gap-6">
              <div className="w-full md:w-1/4">
                <Input
                  radius="sm"
                  variant="bordered"
                  startContent={<Search size={16} className="pointer-events-none text-grey_400" />}
                  placeholder="Search shortlets by name,type or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                className="bg-shorttiee_primary text-white font-medium"
                  onPress={addShortletModal.onOpen}
              >
                Add a Shortlet
              </Button>
            </div>

            <div className="py-8 overflow-x-auto md:overflow-x-visible">
              <Table
                aria-label="shortlet table"
                removeWrapper
                bottomContent={
                  <div className="flex justify-end">
                    <TablePagination />
                  </div>
                }
              >
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Type</TableColumn>
                  <TableColumn>Location</TableColumn>
                  <TableColumn>Price</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Actions</TableColumn>
                </TableHeader>
                  <TableBody emptyContent={isLoading ? (
                    <Spinner size="md" />
                  ) : (
                    "No shortlet to display."
                  )}>
                    {filteredShortlets?.map((item: ListingsDto) => (
                    <TableRow
                      className="bg-white border-y-5 border-grey_100  cursor-pointer"
                        key={item.id}
                        onClick={() => navigate(`${DashboardRoutes.shortlets}/${item.id}`)}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                        <TableCell>{item.address}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <Chip
                          radius="sm"
                          className={`${getStatusClass(item.status)} text-xs font-normal capitalize`}
                        >
                          {item.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Dropdown>
                            <DropdownTrigger>
                              <EllipsisVertical className="text-xs cursor-pointer" />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Shortlet Table Actions">
                              <DropdownItem key="edit">
                                  <Link to={`${DashboardRoutes.shortlets}/edit/${item.id}`}>
                                  Edit Shortlet
                                </Link>
                              </DropdownItem>
                              <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                  onPress={() => {
                                    if (item.id) {
                                      setShortletId(item.id);
                                    deleteShortletModal.onOpen();
                                  }
                                }}
                              >
                                Delete Shortlet
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </TableCell>
                    </TableRow>

                    ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <AddShortletModal
            isOpen={addShortletModal.isOpen}
            onOpenChange={addShortletModal.onOpenChange}
            onClose={addShortletModal.onClose}
          />
        </>
      )}

      {shortletId ? (
        <DeleteShortletModal
          isOpen={deleteShortletModal.isOpen}
          onClose={deleteShortletModal.onClose}
          onOpenChange={deleteShortletModal.onOpenChange}
          id={shortletId}
        />
      ) : null}
    </>
  );
}
