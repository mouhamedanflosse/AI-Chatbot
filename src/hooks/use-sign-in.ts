"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import { UserLoginSchema, UserLoginProps } from "@afs/schems/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ClerkAPIResponseError } from "@clerk/types";
import { useRouter } from "next/navigation";

const useSignInForm = () => {
  const [loading, setLoading] = useState(false);
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();

  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(async (values) => {
    if (!isLoaded || !signIn) {
      toast.error("Authentication service is not ready. Please try again.");
      return;
    }

    try {
      setLoading(true);

      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      switch (result.status) {
        case "complete":
          console.log("complete");
          await setActive({ session: result.createdSessionId });
          router.push("/dashboard");
          console.log("redirection done");
          return;

        case "needs_first_factor":
          console.log("needs_first_factor");
          toast.error("Please complete your authentication step.");
          return;

        case "needs_second_factor":
          console.log("needs_second_factor");
          toast.info("Two-factor authentication required.");
          return;

        default:
          console.warn("Unhandled sign-in status:", result.status);
          toast.error("Unexpected authentication state.");
          return;
      }
    } catch (error) {
      const err = error as ClerkAPIResponseError;
      const code = err.errors?.[0]?.code;
      const message = err.errors?.[0]?.longMessage;

      const errorMap: Record<string, string> = {
        form_password_incorrect: "Incorrect password. Please try again.",
        form_identifier_not_found: "No account found with this email.",
        form_param_format_invalid: "Invalid email format.",
        form_param_nil: "Please fill in all required fields.",
        session_exists: "You are already signed in.",
        too_many_attempts: "Too many attempts. Please try again later.",
      };

      if (code === "session_exists") {
        toast.error(errorMap[code]);
        router.push("/dashboard");
      } else if (code && errorMap[code]) {
        toast.error(errorMap[code]);
      } else {
        toast.error(message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  });

  return {
    methods,
    onHandleSubmit,
    loading,
  };
};

export default useSignInForm;
