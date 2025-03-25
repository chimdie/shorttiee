import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiSDK } from "@/sdk";
import { ReviewReservationDto } from "@/sdk/generated";
import { apiErrorParser } from "@/utils/errorParser";
import { toast } from "@/hooks/use-toast";
import { QueryKeys } from "@/utils/queryKeys";

type AcceptReservationT = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  id: string;
  statusAction: ReviewReservationDto | null;
};

export function AcceptReservationModal(props: AcceptReservationT): JSX.Element {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange, id, statusAction } = props;

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
    onSuccess(data) {
      toast({
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.reservations] });
    },
    onSettled() {
      onClose();
    },
  });

  const onSubmit = () => {
    if (!statusAction?.status) return;
    mutation.mutate({ status: statusAction.status });
  };

  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex justify-center text-shorttiee-primary">
          {statusAction?.status === "ACCEPT" ? "Accept Reservation" : "Reject Reservation"}
        </ModalHeader>
        <ModalBody>
          <div className="py-4 flex gap-4">
            <Button
              onPress={onClose}
              size="md"
              fullWidth
              className="bg-white shadow-sm border text-shorttiee-primary font-medium"
              isLoading={mutation.isPending}
              isDisabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              size="md"
              fullWidth
              className="bg-shorttiee-primary text-white shadow-sm font-medium"
              type="submit"
              isLoading={mutation.isPending}
              isDisabled={mutation.isPending}
              onPress={onSubmit}
            >
              {statusAction?.status === "ACCEPT" ? "Accept" : "Yes Reject"}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
