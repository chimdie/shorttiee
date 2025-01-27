import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { Building2, Eye, EyeOff, Lock, Mail, MapPin, Phone, UserRound, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthRoutes } from "@/types/routes";
import { genderData, SignUpSchema } from "@/schema/auth.schema";
import { ApiSDK } from "@/sdk";
import { ApiError, RegisterDto } from "@/sdk/generated";


export default function SignUp(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast()

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const signUpMutation = useMutation({
    mutationFn: (formData: RegisterDto) => ApiSDK.AuthenticationService.postApiV1AuthRegister(formData),
    onSuccess(data) {
      toast({
        description: data.message
      })
      navigate(AuthRoutes.verifyOtp);
    },
    onError(error) {      
      const err = error as ApiError
      toast({
        variant: "destructive",
        description: err.body.message
      })
    }
  })

  const onSubmit = (data: SignUpSchema) => {
    localStorage.setItem("userEmail", data.email)
    signUpMutation.mutate(data)
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-shorttiee_primary text-center">
          Create Host Account
        </h3>
        <p className="text-base font-normal text-grey_300 text-center">
          Please make sure you enter your correct and valid details
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-7">
          <div className="grid grid-cols-2 space-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      radius="sm"
                      variant="bordered"
                      placeholder="First Name"
                      type="text"
                      startContent={
                        <UserRound size={16} className="pointer-events-none text-grey_400" />
                      }
                      isDisabled={signUpMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      radius="sm"
                      variant="bordered"
                      placeholder="Last Name"
                      type="text"
                      startContent={
                        <UserRound size={16} className="pointer-events-none text-grey_400" />
                      }
                      isDisabled={signUpMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  radius="sm"
                  variant="bordered"
                  placeholder="Gender"
                  aria-label="gender"
                  startContent={<Users size={16} className="pointer-events-none text-grey_400" />}
                  classNames={{ popoverContent: "rounded-md" }}
                  isDisabled={signUpMutation.isPending}
                >
                  {genderData.map((gen) => (
                    <SelectItem key={gen.key}>{gen.label}</SelectItem>
                  ))}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    radius="sm"
                    variant="bordered"
                    placeholder="Phone Number"
                    type="text"
                    startContent={<Phone size={16} className="pointer-events-none text-grey_400" />}
                    isDisabled={signUpMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    isDisabled={signUpMutation.isPending}
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
                    isDisabled={signUpMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="home"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    radius="sm"
                    variant="bordered"
                    placeholder="Your Home Address"
                    type="text"
                    startContent={
                      <MapPin size={16} className="pointer-events-none text-grey_400" />
                    }
                    isDisabled={signUpMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bussinessName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    radius="sm"
                    variant="bordered"
                    placeholder="Business Name"
                    type="text"
                    startContent={
                      <Building2 size={16} className="pointer-events-none text-grey_400" />
                    }
                    isDisabled={signUpMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox radius="sm" checked={field.value} onChange={field.onChange} isDisabled={signUpMutation.isPending} />
                  </FormControl>
                  <FormLabel className="flex items-center space-x-1">
                    <span>I agree to the</span>
                    <span className="text-shorttiee_primary underline">Terms of Service </span>{" "}
                    <span>and</span>
                    <span className="text-shorttiee_primary underline">Privacy Policy</span>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-shorttiee_primary text-white font-semibold"
            radius="sm"
            type="submit"
            isDisabled={signUpMutation.isPending}
            isLoading={signUpMutation.isPending}
          >
            Create Account
          </Button>
        </form>
      </Form>

      <p className="text-center text-grey_300">
        Already have an account?{" "}
        <Link to={AuthRoutes.login} className="font-medium text-shorttiee_secondary">
          Login
        </Link>
      </p>
    </div>
  );
}
