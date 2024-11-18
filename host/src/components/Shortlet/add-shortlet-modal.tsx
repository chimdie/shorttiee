import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

type ShortletModalT = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};
export default function AddShortletModal({
  isOpen,
  onOpenChange,
  onClose,
}: ShortletModalT): JSX.Element {
  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add a Shortlet</ModalHeader>
        <ModalBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
            hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
            hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
          </p>
          <p>
            Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
            adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia
            eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
            consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
            nostrud ad veniam.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
      jejej
    </Modal>
  );
}
