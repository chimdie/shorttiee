import { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { AuthRoutes } from "@/types/routes";
import { LoginSchema } from "@/schema/auth.schema";

export default function Login(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };
  return (
    <div className="space-y-12">
      <div className="flex flex-col space-y-3">
        <h3 className="text-2xl md:text-4xl font-bold text-shorttiee_primary text-center">Login</h3>
        <p className="text-base font-normal text-grey_300">
          Log in to access your account and continue where you left off.
        </p>
      </div>

      <div className="flex flex-col space-y-8">
        <Input
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Email"
          type="email"
          startContent={<Mail className="pointer-events-none flex-shrink-0 text-grey_400 mr-2" />}
          {...register("email")}
          errorMessage={errors?.email?.message}
          isInvalid={!!errors?.email?.message}
        />

        <Input
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Password"
          type={isVisible ? "text" : "password"}
          startContent={<Lock className="pointer-events-none flex-shrink-0 text-grey_400 mr-2" />}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeOff className="text-grey_400 pointer-events-none" />
              ) : (
                <Eye className="text-grey_400 pointer-events-none" />
              )}
            </button>
          }
          {...register("password")}
          errorMessage={errors?.password?.message}
          isInvalid={!!errors?.password?.message}
        />

        <Link
          to={AuthRoutes.forgotPassword}
          className="text-sm text-shorttiee_secondary font-medium underline"
        >
          Forgot Password?
        </Link>

        <Button
          className="bg-shorttiee_primary text-white font-semibold"
          size="lg"
          radius="sm"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
      </div>

      <div>
        <p className="text-center text-grey_300">
          Don't have an account?{" "}
          <Link to={AuthRoutes.createAccount} className="font-medium text-shorttiee_secondary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
