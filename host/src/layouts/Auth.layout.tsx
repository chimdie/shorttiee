import { Link, Outlet, useLocation } from "react-router-dom";
import HelmetHeader from "@/components/HelmetHeader";
import { HomeHashtag } from "iconsax-react";
import { AuthRoutes } from "@/types/routes";

const routeHelmetTitle: Record<AuthRoutes, { title: string; description: string }> = {
  [AuthRoutes.login]: {
    title: "Login",
    description: "Welcome back! Please log in to your account.",
  },
  [AuthRoutes.createAccount]: {
    title: "Create Account",
    description: "Join us today by creating a new account.",
  },
  [AuthRoutes.verifyOtp]: {
    title: "Verify OTP",
    description: "Please enter the OTP sent to your email.",
  },
  [AuthRoutes.forgotPassword]: {
    title: "Forgot Password",
    description: "Enter your email to reset your password.",
  },
  [AuthRoutes.changePassword]: {
    title: "Change Password",
    description: "Please enter your new password.",
  },
};

export default function AuthLayout(): JSX.Element {
  const currentPath = useLocation().pathname as AuthRoutes;

  const { title, description } = routeHelmetTitle[currentPath] || {
    title: "Shorttie",
    description: "Home away from home",
  };
  return (
    <>
      <HelmetHeader title={title} description={description} />
      <div className="min-h-dvh w-screen max-w-[1450px] bg-white overflow-hidden flex mx-auto container">
        <section className="flex flex-col items-center space-y-6 md:space-y-0 w-full">
          <div className="w-fit flex items-center justify-center p-6">
            <Link
              to={AuthRoutes.login}
              aria-label="shorttie-logo"
              className="cursor-pointer flex items-center  gap-1"
            >
              <HomeHashtag size="32" color="#1F253F" />
              <h3 className="text-2xl text-shorttiee_primary font-medium">Shorttie</h3>
            </Link>
          </div>
          <main className="flex items-center justify-center w-full md:h-full p-0 m-0 inset-0">
            <section className="flex items-center justify-center flex-grow md:p-10 px-4 md:max-w-xl">
              <Outlet />
            </section>
          </main>
        </section>
      </div>
    </>
  );
}
