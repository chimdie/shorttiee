import { Pagination } from "@heroui/react";

export default function TablePagination() {
  return (
    <Pagination
      color="primary"
      radius="sm"
      total={10}
      initialPage={1}
      classNames={{
        cursor: "border-1 bg-transparent text-shorttiee-primary",
        item: "bg-transparent shadow-none",
      }}
    />
  );
}
