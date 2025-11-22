"use client";

import LoginForm from "@afs/components/forms/sign-in/login-form";
import SignInFormProvider from "@afs/components/forms/sign-in/sign-in-form";
import useSignInForm from "@afs/hooks/use-sign-in";
import React from "react";

// type Props = {}

const SignUp = () => {
  const { onHandleSubmit, methods, loading } = useSignInForm();

  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
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
