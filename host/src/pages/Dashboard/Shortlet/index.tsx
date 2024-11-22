import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Chip, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { Hotel, Search } from "lucide-react";
import AddShortletModal from "@/components/Shortlet/add-shortlet-modal";
import { shortletData } from "@/dummyData/shortlet";
import TablePagination from "@/components/TablePagination";
import ActionPopover from "@/components/Shortlet/action-popover";
import { DashboardRoutes } from "@/types/routes";

const statusTheme = {
  active: "text-shorttiee_green-dark bg-shorttiee_green-light",
  pending: "text-shorttiee_yellow-dark bg-shorttiee_yellow-light",
  rejected: "text-shorttiee_red-dark bg-shorttiee_red-light",
  terminated: "text-grey_300 bg-grey_200",
};

export default function Shortlet(): JSX.Element {
  const [isShortlet] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const addFirstShortlet = useDisclosure();
  const addShortletModal = useDisclosure();

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
              onClick={addFirstShortlet.onOpen}
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
                <Button className="bg-shorttiee_primary text-white font-medium" onClick={addShortletModal.onOpen}>
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
                      <TableRow className="bg-white border-y-5 border-grey_100 " key={item._id}>
                        <TableCell onClick={() => navigate(`${DashboardRoutes.shortlets}/${item._id}`)}>
                          <span className="line-clamp-2 max-w-full overflow-hidden text-ellipsis whitespace-normal text-xs md:text-sm text-black font-normal cursor-pointer">
                            {item.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs md:text-sm font-normal text-black">{item.type}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs md:text-sm font-normal text-black">
                            {item.location}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs md:text-sm font-normal text-black">{item.price}</span>
                        </TableCell>
                        <TableCell>
                          <Chip radius="sm" className={getStatusClass(item.status)}>
                            <span className="text-xs font-normal capitalize">{item.status}</span>
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div>
                            <ActionPopover id={item._id} />
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

      <AddShortletModal
        isOpen={addFirstShortlet.isOpen}
        onOpenChange={addFirstShortlet.onOpenChange}
        onClose={addFirstShortlet.onClose}
      />
    </>
  );
}
