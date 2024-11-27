import { Pagination } from "@nextui-org/react";

export default function TablePagination() {
  return (
    <Pagination
      color="primary"
      radius="sm"
      total={10}
      initialPage={1}
      classNames={{
        cursor: "border-1 bg-transparent text-shorttiee_primary",
        item: "bg-transparent shadow-none",
      }}
    />
  );
}
