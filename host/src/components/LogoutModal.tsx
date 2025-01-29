import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@heroui/react";
import { LogOut } from "lucide-react";

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};

export default function LogoutModal({
  isOpen,
  onClose,
  onOpenChange,
}: LogoutModalProps): JSX.Element {
  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col p-4 space-y-8">
            <div className="rounded-full bg-gray-100 w-14 h-14 flex justify-center items-center mx-auto">
              <div className="rounded-full bg-white w-10 h-10 flex justify-center items-center aspect-square">
                <LogOut className="text-2xl text-shorttiee_red-dark" />
              </div>
            </div>
            <div className="space-y-4 text-center">
              <h3 className="text-lg font-medium text-shorttiee_primary">
                Are you sure you want to log out?
              </h3>
              <p className="text-sm  text-grey_400">
                Logging out will end your current session, and you'll need to log in again to access
                your account.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-center">
          <div className="flex justify-between gap-6">
            <Button
              onClick={onClose}
              fullWidth
              className="bg-white shadow-sm border text-shorttiee_primary font-medium px-6"
            >
              No, keep me logged in
            </Button>
            <Button
              fullWidth
              className="bg-shorttiee_primary text-white shadow-sm font-medium px-6"
              onPress={onClose}
            >
              Yes, log me out
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
