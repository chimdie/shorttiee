import { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Building2, Eye, EyeOff, Lock, Mail, MapPin, Phone, UserRound, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthRoutes } from "@/types/routes";
import { gender } from "./data";
import { SignUpSchema } from "@/schema/auth.schema";

export default function SignUp(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpSchema) => {
    console.log(data);
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-3">
        <h3 className="text-2xl md:text-4xl font-bold text-shorttiee_primary text-center">
          Create Host Account
        </h3>
        <p className="text-base font-normal text-grey_300 text-center">
          Please make sure you enter your correct and valid details
        </p>
      </div>

      <form className="flex flex-col space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-4">
          <Input
            size="lg"
            radius="sm"
            variant="bordered"
            placeholder="First Name"
            type="text"
            startContent={
              <UserRound className="pointer-events-none flex-shrink-0 text-grey_400 mr-2" />
            }
            {...register("firstName")}
            errorMessage={errors?.firstName?.message}
            isInvalid={!!errors?.firstName?.message}
          />

          <Input
            size="lg"
            radius="sm"
            variant="bordered"
            placeholder="Last Name"
            type="text"
            startContent={
              <UserRound className="pointer-events-none flex-shrink-0 text-grey_400 mr-2" />
            }
            {...register("lastName")}
            errorMessage={errors?.lastName?.message}
            isInvalid={!!errors?.lastName?.message}
          />
        </div>

        <Select
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Gender"
          aria-label="gender"
          startContent={<Users className="pointer-events-none flex-shrink-0 text-grey_400 mr-2" />}
          {...register("gender")}
          errorMessage={errors?.gender?.message}
          isInvalid={!!errors?.gender?.message}
        >
          {gender.map((gen) => (
            <SelectItem key={gen.key}>{gen.label}</SelectItem>
          ))}
        </Select>

        <Input
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Phone Number"
          type="text"
          startContent={<Phone className="pointer-events-none flex-shrink-0 text-grey_400 mr-2" />}
          {...register("phone")}
          errorMessage={errors?.phone?.message}
          isInvalid={!!errors?.phone?.message}
        />

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
          placeholder="Your Home Address"
          type="text"
          startContent={<MapPin className="pointer-events-none flex-shrink-0 text-grey_400 mr-2" />}
          {...register("home")}
          errorMessage={errors?.home?.message}
          isInvalid={!!errors?.home?.message}
        />

        <Input
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Business Name (Optional)"
          type="text"
          startContent={
            <Building2 className="pointer-events-none flex-shrink-0 text-grey_400 mr-2" />
          }
          {...register("bussinessName")}
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

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" {...register("terms")} />
          <label
            htmlFor="terms"
            className="text-sm text-grey_300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the <span className="text-shorttiee_primary underline">Terms of Service</span> and{" "}
            <span className="text-shorttiee_primary underline">Privacy Policy</span>
          </label>
        </div>

        <Button className="bg-shorttiee_primary text-white font-semibold" size="lg" radius="sm" type="submit">
          Create Account
        </Button>
      </form>

      <div>
        <p className="text-center text-grey_300">
          Already have an account?{" "}
          <Link to={AuthRoutes.login} className="font-medium text-shorttiee_secondary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
