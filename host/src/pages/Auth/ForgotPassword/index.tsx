import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ForgotPassWordSchema } from "@/schema/auth.schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ApiSDK } from "@/sdk";
import { AuthRoutes } from "@/types/routes";
import { ForgotPasswordDto } from "@/sdk/generated";


export default function ForgotPassword(): JSX.Element {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<ForgotPassWordSchema>({
    resolver: zodResolver(ForgotPassWordSchema),
  });


  const forgotPasswordMutation = useMutation({
    mutationFn: (formData: ForgotPasswordDto) => ApiSDK.AuthenticationService.postApiV1AuthForgotPassword(formData),
    onSuccess(data) {
      toast({
        description: data.message
      })
      navigate(AuthRoutes.verifyOtp)
    },
    onError(error) {
      toast({
        description: error.message
      })
    }
  })
  const onSubmit = (data: ForgotPassWordSchema) => {
    forgotPasswordMutation.mutate(data)
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-bold text-shorttiee_primary text-center">Forgot Password</h3>
        <p className="text-base font-normal text-grey_300">
          Enter your email and we will send you a link to reset your password
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    radius="sm"
                    variant="bordered"
                    placeholder="Email"
                    type="email"
                    startContent={<Mail size={16} className="pointer-events-none text-grey_400" />}
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
            isDisabled={forgotPasswordMutation.isPending}
            isLoading={forgotPasswordMutation.isPending}
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}
