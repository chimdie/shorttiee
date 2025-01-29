import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { ChangePasswordSchema } from "@/schema/auth.schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ApiSDK } from "@/sdk";
import { ApiError, ChangePasswordDto } from "@/sdk/generated";
import { DashboardRoutes } from "@/types/routes";

export default function ChangePassword(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
  });


  const changePasswordMutation = useMutation({
    mutationFn: (formData: ChangePasswordDto) => ApiSDK.AuthenticationService.postApiV1AuthChangePassword(formData),
    onSuccess(data) {
      toast({
        description: data.message
      })
      navigate(DashboardRoutes.home)
    },
    onError(error) {
      const err = error as ApiError
      toast({
        variant: "destructive",
        description: err.body.message
      })
    }
  })
  const onSubmit = (data: ChangePasswordSchema) => {
    const { oldPassword, newPassword } = data
    const formData = {
      oldPassword, newPassword, reauth: false
    }
    changePasswordMutation.mutate(formData)
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-bold text-shorttiee_primary text-center">Change  Password</h3>
        <p className="text-base font-normal text-grey_300">
          Securing your account is crucial. Create a strong password to protect your information.{" "}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
          <FormField
            control={form.control}
            name="oldPassword"
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
                    isDisabled={changePasswordMutation.isPending}
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
                    isDisabled={changePasswordMutation.isPending}
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
                    isDisabled={changePasswordMutation.isPending}
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
            isDisabled={changePasswordMutation.isPending}
            isLoading={changePasswordMutation.isPending}

          >
            Change
          </Button>
        </form>
      </Form>
    </div>
  );
}
