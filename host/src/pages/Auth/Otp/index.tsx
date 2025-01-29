import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { OtpSchema } from "@/schema/auth.schema";
import { DashboardRoutes } from "@/types/routes";


export default function Otp(): JSX.Element {
  const [timer, setTimer] = useState<number>(60);
  const [, setShowResend] = useState<boolean>(false);
  const userEmail = localStorage.getItem("userEmail")
  const navigate = useNavigate()

  const form = useForm<OtpSchema>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (data: OtpSchema) => {
    console.log(data);
    navigate(DashboardRoutes.home)
  };

  useEffect(() => {
    if (timer > 0) {
      const countDown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countDown);
    } else {
      setShowResend(true);
    }
  }, [timer]);

  const formatCountDown = (counter: number) => {
    return counter < 10 ? `0${counter}` : `${counter}`;
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-bold text-shorttiee_primary text-center">Verify Account</h3>
        <p className="text-base font-normal text-grey_300">
          Verify your account with the otp we sent to{" "}
          <span className="text-shorttiee_primary font-bold">{userEmail}</span>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-8">
              <Button
                className="bg-shorttiee_primary text-white font-semibold w-full"
                size="lg"
                radius="sm"
                type="submit"
              >
                Verify OTP
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="flex items-center justify-between w-full">
        <p className="text-grey_300 text-base font-medium">
          Didn't receive OTP?{" "}
          {timer > 0 ? (
            <span className="text-shorttiee_primary cursor-pointer font-semibold">Resend</span>
          ) : null}
        </p>

        <p className="text-grey_300 text-base">{formatCountDown(timer)} secs</p>
      </div>
    </div>
  );
}
