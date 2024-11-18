import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { Trash2 } from "lucide-react";

type DeleteShortletModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  id: string;
};

export default function DeleteShortletModal({
  isOpen,
  onClose,
  onOpenChange,
  id,
}: DeleteShortletModalProps): JSX.Element {
  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col py-8 space-y-8">
            <div className="rounded-full bg-gray-100 w-14 h-14 flex justify-center items-center mx-auto">
              <div className="rounded-full bg-white w-10 h-10 flex justify-center items-center">
                <Trash2 className="text-2xl text-shorttiee_red-dark" />
              </div>
            </div>
            <div className="space-y-4 text-center">
              <h3 className="text-lg font-medium text-shorttiee_primary">
                Are you sure you want to delete this shortlet
              </h3>
              <p className="text-sm  text-grey_400">
                Deleting this shortlet will revoke your access to the shortlet and all associated
                privileges.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-3 pt-8">
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
              Delete
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
