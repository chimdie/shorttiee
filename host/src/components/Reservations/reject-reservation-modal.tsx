import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiSDK } from "@/sdk";
import { ReviewReservationDto } from "@/sdk/generated";
import { apiErrorParser } from "@/utils/errorParser";
import { toast } from "@/hooks/use-toast";
import { QueryKeys } from "@/utils/queryKeys";

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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (paload: ReviewReservationDto) =>
      ApiSDK.ReservationService.patchApiV1UsersReservations(id, paload),
    onError(error) {
      const parsedError = apiErrorParser(error);

      toast({
        variant: "destructive",
        description: parsedError.message,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.reservations] });
    },
    onSettled() {
      onClose();
    },
  });

  const onSubmit = () => {
    mutation.mutate({ status: "DECLINE" });
  };

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={!mutation.isPending}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-shorttiee-primary">
          Reject Reservation
        </ModalHeader>
        <ModalBody>
          <div className="py-4 flex  gap-4">
            <Button
              onPress={onClose}
              fullWidth
              className="bg-white shadow-sm border text-shorttiee-primary font-medium"
              isLoading={mutation.isPending}
              isDisabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              className="bg-shorttiee-primary text-white shadow-sm font-medium"
              type="submit"
              isLoading={mutation.isPending}
              isDisabled={mutation.isPending}
              onPress={onSubmit}
            >
              Yes Reject
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
