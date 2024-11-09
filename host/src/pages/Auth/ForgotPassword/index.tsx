import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { ForgotPassWordSchema } from "@/schema/auth.schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

export default function ForgotPassword(): JSX.Element {
  const form = useForm<ForgotPassWordSchema>({
    resolver: zodResolver(ForgotPassWordSchema),
  });

  const onSubmit = (data: ForgotPassWordSchema) => {
    console.log(data);
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
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}
