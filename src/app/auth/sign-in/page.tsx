"use client";

import LoginForm from "@afs/components/forms/sign-in/login-form";
import SignInFormProvider from "@afs/components/forms/sign-in/sign-in-form";
import { Button } from "@afs/components/ui/button";
import useGoogleOauth from "@afs/hooks/use-goolge-Oauth";
import useSignInForm from "@afs/hooks/use-sign-in";
import React from "react";

// type Props = {}

const SignUp = () => {
  const { onHandleSubmit, methods, loading } = useSignInForm();
  const { onGoogleOauth } = useGoogleOauth();

  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <Button onClick={() => onGoogleOauth()}> continue with google</Button>
        <SignInFormProvider
          methods={methods}
          onHandleSubmit={onHandleSubmit}
          loading={loading}
        >
          <div className="flex flex-col gap-3">
            <LoginForm
              methods={methods}
              onHandleSubmit={onHandleSubmit}
              loading={loading}
            />
          </div>
        </SignInFormProvider>
      </div>
    </div>
  );
};

export default SignUp;
