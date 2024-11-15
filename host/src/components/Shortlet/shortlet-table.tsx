import {
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

export default function ShortletTable(): JSX.Element {
  return (
    <div className="py-6">
      <div className="flex  justify-between items-center gap-6">
        <div className="w-3/4">
          <Input
            radius="sm"
            variant="bordered"
            startContent={<Search size={16} className="pointer-events-none text-grey_400" />}
            placeholder="Search shortlets by name,type or location"
          />
        </div>
        <Button className="bg-shorttiee_primary font-medium ">Add Shorlet</Button>
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
          <TableBody>
            <TableRow className="bg-white border-y-5 border-grey_100 cursor-pointer">
              <TableCell>jejeje</TableCell>
              <TableCell>jejeje</TableCell>
              <TableCell>jejeje</TableCell>
              <TableCell>jejeje</TableCell>
              <TableCell>jejeje</TableCell>
              <TableCell>jejeje</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
