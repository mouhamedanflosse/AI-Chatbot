"use client";
import { useSignUp } from "@clerk/nextjs";
import React, { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ClerkAPIResponseError } from "@clerk/types";
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@afs/schems/auth-schema";
import z from "zod";
import { onCompleteUserRegistration } from "@afs/actions/auth";
import { RedirectType, redirect } from "next/navigation";
const useSignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, signUp, setActive } = useSignUp();

  const methods = useForm<z.infer<typeof UserRegistrationSchema>>({
    resolver: zodResolver(UserRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      type: "owner",
    },
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      console.log("form values", values);
      if (!isLoaded) return;

      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });

        if (completeSignUp.status !== "complete") {
          return { message: "Something went wrong!" };
        }

        if (completeSignUp.status === "complete") {
          if (!signUp.createdUserId) return;

          const registered = await onCompleteUserRegistration(
            values.fullname,
            signUp.createdUserId,
            values.type
          );

          if (registered?.status === 200 && registered.user) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });

            setLoading(true);
            redirect("/dashboard", RedirectType.push);
          }

          if (registered?.status === 400) {
            toast("error", {
              description: "Something went wrong!",
            });
          }
        }
      } catch (error) {
        const err = error as ClerkAPIResponseError;
        toast("error", {
          description: err.errors[0].longMessage,
        });
      }
    }
  );

  // Generate OTP
  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      console.log("OTP sent to email");

      onNext((prev) => prev + 1);
    } catch (error) {
      const err = error as ClerkAPIResponseError;
      toast("test", { description: err.errors[0].longMessage });
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
