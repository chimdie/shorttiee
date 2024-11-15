import ShortletTable from "@/components/Shortlet/shortlet-table";
import { Button } from "@/components/ui/button";
import { Hotel } from "lucide-react";
import { useState } from "react";

export default function Shortlet(): JSX.Element {
  const [isShortlet] = useState<boolean>(false);
  return (
    <>
      {isShortlet ? (
        <div className="flex flex-col justify-center items-center mx-auto h-full">
          <div className="p-4 border rounded-md ">
            <Hotel className="size-12" />
          </div>
          <div className="py-8 md:w-1/2">
            <div className="space-y-4">
              <h3 className="text-shorttiee_primary text-lg md:text-xl font-medium text-center">
                You currently dont have any Shortlets Listed
              </h3>
              <p className="text-grey_300 text-sm md:text-base text-center">
                Looks like you haven't added any shortlets yet.This area will light up with your
                shortlets once you list or add them{" "}
              </p>
            </div>
          </div>
          <div>
            <Button className="bg-shorttiee_primary font-medium w-full">Add Shortlet</Button>
          </div>
        </div>
      ) : (
        <>
          <ShortletTable />
        </>
      )}
    </>
  );
}
