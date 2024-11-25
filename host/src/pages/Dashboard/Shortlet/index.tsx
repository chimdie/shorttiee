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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { EllipsisVertical, Hotel, Search } from "lucide-react";
import AddShortletModal from "@/components/Shortlet/add-shortlet-modal";
import TablePagination from "@/components/TablePagination";
import DeleteShortletModal from "@/components/Shortlet/delete-shortlet-modal";
import { DashboardRoutes } from "@/types/routes";
import { shortletData } from "@/dummyData/shortlet";

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

  const addShortletModal = useDisclosure();
  const deleteShortletModal = useDisclosure();

  const navigate = useNavigate();

  const filteredShortlets = shortletData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
              onClick={addShortletModal.onOpen}
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
                onClick={addShortletModal.onOpen}
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
                <TableBody emptyContent={"No shortlet to display."}>
                  {filteredShortlets.map((item) => (
                    <TableRow
                      className="bg-white border-y-5 border-grey_100  cursor-pointer"
                      key={item._id}
                      onClick={() => navigate(`${DashboardRoutes.shortlets}/${item._id}`)}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.location}</TableCell>
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
                                <Link to={`${DashboardRoutes.shortlets}/edit/${item._id}`}>
                                  Edit Shortlet
                                </Link>
                              </DropdownItem>
                              <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                onClick={() => {
                                  if (item._id) {
                                    setShortletId(item._id);
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
