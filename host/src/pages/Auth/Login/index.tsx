import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { AuthRoutes, DashboardRoutes } from "@/types/routes";
import { LoginSchema } from "@/schema/auth.schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ApiSDK } from "@/sdk";
import { useToast } from "@/hooks/use-toast";
import { ApiError, LoginDto } from "@/sdk/generated";
import { useSetAtom } from "jotai";
import { loggedinUserAtom, storedAuthTokenAtom } from "@/atoms/user.atom";

export default function Login(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const setStoredToken = useSetAtom(storedAuthTokenAtom);
  const setLoggedInUser = useSetAtom(loggedinUserAtom);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const signInMutation = useMutation({
    mutationFn: (formData: LoginDto) => ApiSDK.AuthenticationService.postApiV1AuthLogin(formData),
    onSuccess(data) {
      if (data) {
        const { token } = data.data;
        ApiSDK.OpenAPI.TOKEN = token;
        setStoredToken(token);
        setLoggedInUser(data);
        navigate(DashboardRoutes.home, { replace: true });
        toast({
          description: data.message,
        });
      }
    },
    onError(error) {
      const err = error as ApiError;
      toast({
        variant: "destructive",
        description: err.body.message,
      });
    },
  });

  const onSubmit = (data: LoginSchema) => {
    signInMutation.mutate(data);
  };
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-bold text-shorttiee_primary text-center">Login</h3>
        <p className="text-base font-normal text-grey_300">
          Log in to access your account and continue where you left off.
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
                    isDisabled={signInMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    radius="sm"
                    variant="bordered"
                    placeholder="Password"
                    type={isVisible ? "text" : "password"}
                    isDisabled={signInMutation.isPending}
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

          <Link
            to={AuthRoutes.forgotPassword}
            className="text-sm text-shorttiee_secondary font-medium underline"
          >
            Forgot Password?
          </Link>

          <Button
            className="bg-shorttiee_primary text-white font-semibold"
            radius="sm"
            type="submit"
            isDisabled={signInMutation.isPending}
            isLoading={signInMutation.isPending}
          >
            Login
          </Button>
        </form>
      </Form>

      <div>
        <p className="text-center text-grey_300">
          Don't have an account?{" "}
          <Link to={AuthRoutes.createAccount} className="font-medium text-shorttiee_secondary">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
