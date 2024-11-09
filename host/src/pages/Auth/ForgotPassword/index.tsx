import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { ForgotPassWordSchema } from "@/schema/auth.schema";

export default function ForgotPassword(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassWordSchema>({
    resolver: zodResolver(ForgotPassWordSchema),
  });

  const onSubmit = (data: ForgotPassWordSchema) => {
    console.log(data);
  };
  return (
    <div className="space-y-12">
      <div className="flex flex-col space-y-3">
        <h3 className="text-2xl md:text-4xl font-bold text-shorttiee_primary text-center">Forgot Password</h3>
        <p className="text-base font-normal text-grey_300">
          Enter your email and we will send you a link to reset your password
        </p>
      </div>

      <form className="flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
        <Button className="bg-shorttiee_primary text-white font-semibold" size="lg" radius="sm" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
