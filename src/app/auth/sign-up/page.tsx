"use client";
import SignUpFormProvider from "@afs/components/forms/sign-up/sign-up-form";
import RegistrationFormStep from "@afs/components/forms/sign-up/registration-setp";

import React from "react";
import ButtonHandler from "@afs/components/forms/sign-up/button-handler";
import HighLightBar from "@afs/components/forms/sign-up/highlight-bar";
import useSignUpForm from "@afs/hooks/use-sign-up";

// type Props = {}

const SignUp = () => {
  const { methods, onHandleSubmit, loading, onGenerateOTP } = useSignUpForm();
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignUpFormProvider
          methods={methods}
          onHandleSubmit={onHandleSubmit}
          loading={loading}
        >
          <div className="flex flex-col gap-3">
            <RegistrationFormStep methods={methods} />
            <ButtonHandler
              methods={methods}
              onHandleSubmit={onHandleSubmit}
              loading={loading}
              onGenerateOTP={onGenerateOTP}
            />
          </div>
          <HighLightBar />
        </SignUpFormProvider>
      </div>
    </div>
  );
};

export default SignUp;
