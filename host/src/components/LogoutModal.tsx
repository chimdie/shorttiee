import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@heroui/react";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/use-logout";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = useLogout();

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      logout({ redirect: true });
      setIsLoading(false);
      onClose();
    }, 2000);
  };
  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col p-4 space-y-8">
            <div className="rounded-full bg-gray-100 w-14 h-14 flex justify-center items-center mx-auto">
              <div className="rounded-full bg-white w-10 h-10 flex justify-center items-center aspect-square">
                <LogOut className="text-2xl text-shorttiee-red-dark" />
              </div>
            </div>
            <div className="space-y-4 text-center">
              <h3 className="text-lg font-medium text-shorttiee-primary">
                Are you sure you want to log out?
              </h3>
              <p className="text-sm  text-grey-400">
                Logging out will end your current session, and you'll need to log in again to access
                your account.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-center">
          <div className="flex justify-between gap-6">
            <Button
              onPress={onClose}
              fullWidth
              className="bg-white shadow-sm border text-shorttiee-primary font-medium px-6"
            >
              No, keep me logged in
            </Button>
            <Button
              fullWidth
              className="bg-shorttiee-primary text-white shadow-sm font-medium px-6"
              onPress={handleLogout}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Yes, log me out
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
