import { Link } from "react-router-dom";
import { Button, Divider, useDisclosure } from "@heroui/react";
import DeleteAccountModal from "@/components/DeleteAccountModal";
import { AuthRoutes } from "@/types/routes";

export default function Settings(): JSX.Element {
  const deleteAcount = useDisclosure();
  return (
    <>
      <div className="py-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center ">
            <div>
              <h3 className="text-lg text-shorttiee-primary font-medium">Password</h3>
              <p className="text-md text-grey-300">Set a unique password to protect your account</p>
            </div>
            <div>
              <Button variant="light" className="text-shorttiee-primary font-semibold">
                <Link to={AuthRoutes.changePassword}>Change Password</Link>
              </Button>
            </div>
          </div>

          <Divider />

          <div className="flex justify-between items-center ">
            <div>
              <h3 className="text-lg text-shorttiee-primary font-medium">Delete Acccount</h3>
              <p className="text-md text-grey-300">
                This will delete your account.Your account will be permanently deleted from
                Shorttiee
              </p>
            </div>
            <div>
              <Button
                variant="light"
                className="text-shorttiee-red-dark font-semibold"
                onPress={deleteAcount.onOpen}
              >
                Delete
              </Button>
            </div>
          </div>

          <Divider />
        </div>
      </div>

      <DeleteAccountModal
        isOpen={deleteAcount.isOpen}
        onClose={deleteAcount.onClose}
        onOpenChange={deleteAcount.onOpenChange}
      />
    </>
  );
}
