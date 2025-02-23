import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@heroui/react";
import { UserX } from "lucide-react";

type DeleteAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onOpenChange,
}: DeleteAccountModalProps): JSX.Element {
  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col p-4 space-y-8">
            <div className="rounded-full bg-gray-100 w-14 h-14 flex justify-center items-center mx-auto">
              <div className="rounded-full bg-white w-10 h-10 flex justify-center items-center aspect-square">
                <UserX className="text-2xl text-shorttiee-red-dark" />
              </div>
            </div>
            <div className="space-y-4 text-center">
              <h3 className="text-lg font-medium text-shorttiee-primary">
                Are you sure you want to delete your account?
              </h3>
              <p className="text-sm  text-grey-400">
                Deleting your account will end your current session, and permanently delete your
                information and shortlet details from Shorttiee.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between gap-6">
          <Button
            onPress={onClose}
            size="lg"
            fullWidth
            className="bg-white shadow-sm border text-shorttiee-primary font-medium"
          >
            No, keep me in
          </Button>

          <Button
            size="lg"
            fullWidth
            className="bg-shorttiee-red-dark text-white shadow-sm font-medium"
            onPress={onClose}
          >
            Yes, delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
