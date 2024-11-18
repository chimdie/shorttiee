import { useState } from "react";
import { Link } from "react-router-dom";
import { Divider, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import { DashboardRoutes } from "@/types/routes";
import { EllipsisVertical } from "lucide-react";
import DeleteShortletModal from "./delete-shortlet-modal";

type ActionPopoverProps = {
  id: string;
};

export default function ActionPopover({ id }: ActionPopoverProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteShortletModal = useDisclosure();

  const openDeleteShortlet = (): void => {
    setIsOpen(false);
    deleteShortletModal.onOpen();
  };

  return (
    <>
      <Popover
        placement="bottom-end"
        size="sm"
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
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
            <div className="py-3 pl-3 pr-6 cursor-pointer" onClick={openDeleteShortlet}>
              <p className="text-sm font-medium">Delete Shortlet</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <DeleteShortletModal
        isOpen={deleteShortletModal.isOpen}
        onClose={deleteShortletModal.onClose}
        onOpenChange={deleteShortletModal.onOpenChange}
        id={id}
      />
    </>
  );
}
