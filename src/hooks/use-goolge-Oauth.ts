"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClerkAPIResponseError } from "@clerk/types";
import { toast } from "sonner";

const useGoogleOauth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const onGoogleOauth = async () => {
    setLoading(true);

    if (!isLoaded || !signIn) {
      toast.error("Authentication service is not ready. Please try again.");
      return;
    }
    try {
      const result = await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: "/dashboard",
      });

      return router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return { onGoogleOauth, loading };
};

export default useGoogleOauth;
