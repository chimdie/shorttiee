import { DashboardRoutes } from "@/types/routes";
import { Divider, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type ActionPopoverProps = {
  id: string;
};

export default function ActionPopover({ id }: ActionPopoverProps): JSX.Element {
  return (
    <>
      <Popover placement="bottom-end" backdrop="opaque" size="sm">
        <PopoverTrigger>
          <div>
            <EllipsisVertical className="text-xs md:text-sm text-black cursor-pointer" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="rounded-none mt-1 p-0">
          <div>
            <Link to={`${DashboardRoutes.shortlets}/edit/${id}`}>
              <div className="py-3 pl-3 pr-6 cursor-pointer">
                <p className="text-sm font-medium">Edit Shortlet</p>
              </div>
            </Link>
            <Divider orientation="horizontal" />
            <div className="py-3 pl-3 pr-6 cursor-pointer">
              <p className="text-sm font-medium">Delete Shortlet</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
