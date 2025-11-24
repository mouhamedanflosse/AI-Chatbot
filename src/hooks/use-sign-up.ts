"use client";

import {
  UserLoginProps,
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@afs/schems/auth-schema";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import { ClerkAPIResponseError } from "@clerk/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onCompleteUserRegistration } from "@afs/actions/auth";
import { useRouter } from "next/navigation";

const useSignUpForm = () => {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      type: "owner",
    },
  });

  const onHandleSubmit = methods.handleSubmit(async (values) => {
    if (!isLoaded || !signUp) {
      toast.error("Authentication service is not ready. Please try again.");
      return;
    }
    try {
      setLoading(true);
      const result = await signUp.attemptEmailAddressVerification({
        code: values.otp,
      });

      if (result.status == "abandoned") {
        toast.error("this OTP code is expired");
        return;
      } else if (result.status !== "complete") {
        toast.error("something went wrong!");
        return;
      }

      const user = await onCompleteUserRegistration(
        values.fullname,
        result.createdUserId as string,
        values.type
      );

      if (user?.status == 200 && user.user) {
        setLoading(false);
        setActive({
          session: result.createdSessionId,
        });
        router.push("/dashboard");
      } else {
        toast.error("something went wrong!");
      }
    } catch (error) {
      const err = error as ClerkAPIResponseError;
      toast.error(err.errors?.[0]?.longMessage);
    } finally {
      setLoading(false);
    }
  });

  // generate OT
  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded || !signUp) {
      toast.error("Authentication service is not ready. Please try again.");
      return;
    }

    try {
      setLoading(true);

      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("A one-time code was sent to your email.");

      onNext((prev) => prev + 1);
    } catch (error) {
      const err = error as ClerkAPIResponseError;
      const message = err.errors?.[0]?.longMessage;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  };
};

export default useSignUpForm;
