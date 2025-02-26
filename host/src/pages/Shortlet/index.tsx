import { useCallback, useMemo, useState } from "react";
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
import { EllipsisVertical, Search } from "lucide-react";
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
import { currencyParser } from "@/utils/currencyParser";

const statusTheme: Record<ListingsDto["status"], string> = {
  APPROVED: "bg-shorttiee-green-light",
  AWAITING_REVIEW: "bg-shorttiee-yellow-light",
  REJECTED: "bg-shorttiee-red-light",
};

export default function Shortlet(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [shortletId, setShortletId] = useState<string | null>(null);
  const user = useAtomValue(loggedinUserAtom);
  const addShortletModal = useDisclosure();
  const deleteShortletModal = useDisclosure();
  const navigate = useNavigate();

  const userId = user?.data?.id;

  const { data: shortletData, isLoading } = useQuery({
    queryKey: [QueryKeys.shortlets, userId, searchQuery],
    queryFn: () =>
      ApiSDK.ListingService.getApiV1Listings(
        JSON.stringify([
          ["userId", "eq", userId],
          ["name", "like", `%${searchQuery}%`],
        ]),
      ),
    enabled: !!userId,
    refetchOnMount: false,
  });

  const filteredShortlets = useMemo(() => {
    const availableShortlets = shortletData?.data || [];

    if (!searchQuery) return availableShortlets;

    return availableShortlets.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, shortletData?.data]);

  const getStatusClass = (status: ListingsDto["status"]) => {
    return statusTheme[status] || "";
  };

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearchQuery(value);
    } else {
      setSearchQuery("");
    }
  }, []);

  return (
    <>
      <div className="py-6 space-y-6">
        <div className="flex  justify-between items-center gap-6">
          <div className="w-full md:w-1/4">
            <Input
              radius="sm"
              variant="bordered"
              startContent={<Search size={16} className="pointer-events-none text-grey-400" />}
              placeholder="Search shortlets by name,type or location"
              value={searchQuery}
              onValueChange={onSearchChange}
              isClearable
            />
          </div>
          <Button
            className="bg-shorttiee-primary text-white font-medium"
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
            <TableBody emptyContent={isLoading ? <Spinner size="md" /> : "No shortlet to display."}>
              {filteredShortlets.map((item: ListingsDto) => (
                <TableRow
                  className="bg-white border-y-5 border-grey_100  cursor-pointer"
                  key={item.id}
                  onClick={() => navigate(`${DashboardRoutes.shortlets}/${item.id}`)}
                >
                  <TableCell>{item.name ?? ""}</TableCell>
                  <TableCell>{item.type ?? ""}</TableCell>
                  <TableCell>{item.address ?? ""}</TableCell>
                  <TableCell>{item.price && currencyParser(Number(item.price))}</TableCell>
                  <TableCell>
                    <Chip
                      radius="sm"
                      className={`${getStatusClass(item.status)} text-xs font-normal capitalize`}
                    >
                      {item.status.replace("_", " ")}
                    </Chip>
                  </TableCell>
                  <TableCell>
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
