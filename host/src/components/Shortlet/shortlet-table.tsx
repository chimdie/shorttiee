import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chip,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import TablePagination from "../TablePagination/index";
import { shortletData } from "@/dummyData/shortlet";
import { DashboardRoutes } from "@/types/routes";
import ActionPopover from "./action-popover";

const statusTheme = {
  active: "text-shorttiee_green-dark bg-shorttiee_green-light",
  pending: "text-shorttiee_yellow-dark bg-shorttiee_yellow-light",
  rejected: "text-shorttiee_red-dark bg-shorttiee_red-light",
  terminated: "text-grey_300 bg-grey_200",
};

export default function ShortletTable(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
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
        <Button className="bg-shorttiee_primary font-medium">Add Shorlet</Button>
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
                  <span className="text-xs md:text-sm font-normal text-black">{item.location}</span>
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
  );
}
