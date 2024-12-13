import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { AtSign, HandCoins, Info, Landmark, Signature } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AcceptReservationSchema } from "@/schema/reservation.schema";

type AcceptReservationT = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  id: string;
};

export default function AcceptReservationModal({
  isOpen,
  onClose,
  onOpenChange,
  id,
}: AcceptReservationT): JSX.Element {
  const form = useForm<AcceptReservationSchema>({
    resolver: zodResolver(AcceptReservationSchema),
  });

  const onSubmit = (data: AcceptReservationSchema) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-shorttiee_primary">
          Accept Reservation
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
                        defaultValue={id}
                        type="text"
                        startContent={
                          <Signature size={16} className="pointer-events-none text-grey_400" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        radius="sm"
                        variant="bordered"
                        placeholder="Payment Account"
                        type="text"
                        startContent={
                          <HandCoins size={16} className="pointer-events-none text-grey_400" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        radius="sm"
                        variant="bordered"
                        placeholder="Account Name"
                        type="text"
                        startContent={
                          <AtSign size={16} className="pointer-events-none text-grey_400" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        radius="sm"
                        variant="bordered"
                        placeholder="Bank Name"
                        type="text"
                        startContent={
                          <Landmark size={16} className="pointer-events-none text-grey_400" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        radius="sm"
                        variant="bordered"
                        placeholder="Additional Information(Optional)"
                        startContent={
                          <Info size={16} className="pointer-events-none text-grey_400" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="py-4 flex  gap-4">
                <Button
                  onClick={onClose}
                  size="lg"
                  fullWidth={true}
                  className="bg-white shadow-sm border text-shorttiee_primary font-medium"
                >
                  Cancel
                </Button>
                <Button
                  size="lg"
                  fullWidth={true}
                  className="bg-shorttiee_primary text-white shadow-sm font-medium"
                  onClick={() => {
                    console.log(id);
                    onClose();
                  }}
                >
                  Accept
                </Button>
              </div>
            </form>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
