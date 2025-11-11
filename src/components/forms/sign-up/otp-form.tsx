import { UserRegistrationProps } from "@afs/schems/auth-schema";
import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@afs/components/ui/input-otp";

type Props = {
  register: UseFormRegister<UserRegistrationProps>;
  setOtp: UseFormSetValue<UserRegistrationProps>;
};

export default function otpForm({ setOtp }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 mb-3">
      enter the OTP sent to your email
      <InputOTP
        maxLength={6}
        onComplete={(value: string) => setOtp("otp", value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
