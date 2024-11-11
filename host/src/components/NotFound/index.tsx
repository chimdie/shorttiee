import { HomeHashtag } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthRoutes } from "@/types/routes";

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(AuthRoutes.login); //this route is subject to change
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center  gap-1">
        <HomeHashtag size="32" color="#1F253F" />
        <h3 className="text-2xl text-shorttiee_primary font-medium">Shorttie</h3>
      </div>

      <div className="py-8 space-y-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-300 text-center">Page Not Found</h1>

        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>

        <p className="text-gray-400 mb-6 text-center">The page you're looking for doesn't exist.</p>
        <Button
          className="bg-shorttiee_primary text-white font-medium w-full"
          onClick={handleRedirect}
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}
