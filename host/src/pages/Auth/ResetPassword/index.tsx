import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { ResetPasswordSchema } from "@/schema/auth.schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

export default function ResetPassword(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    console.log(data);
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-bold text-shorttiee_primary text-center">Reset Password</h3>
        <p className="text-base font-normal text-grey_300">
          Securing your account is crucial. Create a strong password to protect your information.{" "}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    radius="sm"
                    variant="bordered"
                    placeholder="Current Password"
                    type={isVisible ? "text" : "password"}
                    startContent={<Lock size={16} className="pointer-events-none text-grey_400" />}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <EyeOff size={16} className="text-grey_400 pointer-events-none" />
                        ) : (
                          <Eye size={16} className="text-grey_400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    radius="sm"
                    variant="bordered"
                    placeholder="New Password"
                    type={isVisible ? "text" : "password"}
                    startContent={<Lock size={16} className="pointer-events-none text-grey_400" />}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <EyeOff size={16} className="text-grey_400 pointer-events-none" />
                        ) : (
                          <Eye size={16} className="text-grey_400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    radius="sm"
                    variant="bordered"
                    placeholder="Confirm Password"
                    type={isVisible ? "text" : "password"}
                    startContent={<Lock size={16} className="pointer-events-none text-grey_400" />}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <EyeOff size={16} className="text-grey_400 pointer-events-none" />
                        ) : (
                          <Eye size={16} className="text-grey_400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-shorttiee_primary text-white font-semibold"
            size="lg"
            radius="sm"
            type="submit"
          >
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
}
