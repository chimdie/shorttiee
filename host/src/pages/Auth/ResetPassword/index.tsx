import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { ResetPasswordSchema } from "@/schema/auth.schema";

export default function ResetPassword(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    console.log(data);
  };
  return (
    <div className="space-y-12">
      <div className="flex flex-col space-y-3">
        <h3 className="text-2xl md:text-4xl font-bold text-primary text-center">Reset Password</h3>
        <p className="text-base font-normal text-grey_300">
          Securing your account is crucial. Create a strong password to protect your information.{" "}
        </p>
      </div>

      <form className="flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Current Password"
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
          {...register("currentPassword")}
          errorMessage={errors?.currentPassword?.message}
          isInvalid={!!errors?.currentPassword?.message}
        />
        <Input
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="New Password"
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
          {...register("newPassword")}
          errorMessage={errors?.newPassword?.message}
          isInvalid={!!errors?.newPassword?.message}
        />
        <Input
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Confirm Password"
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
          {...register("confirmPassword")}
          errorMessage={errors?.confirmPassword?.message}
          isInvalid={!!errors?.confirmPassword?.message}
        />
        <Button className="bg-primary text-white font-semibold" size="lg" radius="sm" type="submit">
          Reset
        </Button>
      </form>
    </div>
  );
}
