import { Link } from "react-router-dom";
import { BreadcrumbItem, Breadcrumbs, Button, Divider, useDisclosure } from "@nextui-org/react";
import DeleteAccountModal from "@/components/DeleteAccountModal";
import { AuthRoutes, DashboardRoutes } from "@/types/routes";

export default function Settings(): JSX.Element {
  const deleteAcount = useDisclosure();
  return (
    <>
      <div className="py-6 space-y-6">
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to={DashboardRoutes.home}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Settings</BreadcrumbItem>
        </Breadcrumbs>

        <div className="space-y-4 w-2/3">
          <div className="flex justify-between items-center ">
            <div className="space-y-2">
              <h3 className="text-lg text-shorttiee_primary font-medium">Password</h3>
              <p className="text-md text-grey_300">Set a unique password to protect your account</p>
            </div>
            <div>
              <Button variant="light" className="text-shorttiee_primary font-semibold">
                <Link to={AuthRoutes.resetPassword}>Change Password</Link>
              </Button>
            </div>
          </div>

          <Divider />

          <div className="flex justify-between items-center ">
            <div className="space-y-2">
              <h3 className="text-lg text-shorttiee_primary font-medium">Delete Acccount</h3>
              <p className="text-md text-grey_300">
                This will delete your account.Your account will be permanently deleted from
                Shorttiee
              </p>
            </div>
            <div>
              <Button
                variant="light"
                className="text-shorttiee_red-dark font-semibold"
                onClick={deleteAcount.onOpen}
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
