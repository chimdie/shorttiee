import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { BrainCircuit, Signature } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RejectedReservationSchema, rejectReasons } from "@/schema/reservation.schema";

type RejectReservationT = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  id: string;
};

export default function RejectReservationModal({
  isOpen,
  onClose,
  onOpenChange,
  id,
}: RejectReservationT): JSX.Element {
  const form = useForm<RejectedReservationSchema>({
    resolver: zodResolver(RejectedReservationSchema),
    defaultValues: {
      reserveNo: id,
    },
  });

  const onSubmit = (data: RejectedReservationSchema) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-shorttiee-primary">
          Reject Reservation
        </ModalHeader>
        <ModalBody>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5 py-4">
              <FormField
                control={form.control}
                name="reserveNo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        radius="sm"
                        isDisabled
                        variant="bordered"
                        placeholder="Reservation Number"
                        value={id}
                        type="text"
                        startContent={
                          <Signature size={16} className="pointer-events-none text-grey-400" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      onChange={field.onChange}
                      radius="sm"
                      variant="bordered"
                      placeholder="Reason for Rejection"
                      aria-label="type"
                      startContent={
                        <BrainCircuit size={16} className="pointer-events-none text-grey-400" />
                      }
                      classNames={{ popoverContent: "rounded-md" }}
                    >
                      {rejectReasons.map((type) => (
                        <SelectItem key={type.key}>{type.label}</SelectItem>
                      ))}
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="py-4 flex  gap-4">
                <Button
                  onPress={onClose}
                  size="md"
                  fullWidth={true}
                  className="bg-white shadow-sm border text-shorttiee-primary font-medium"
                >
                  Cancel
                </Button>
                <Button
                  size="md"
                  fullWidth={true}
                  className="bg-shorttiee-primary text-white shadow-sm font-medium"
                  type="submit"
                >
                  Done
                </Button>
              </div>
            </form>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
