"use client";
import useSignInForm from "@afs/hooks/use-sign-in";
import useSignUpForm from "@afs/hooks/use-sign-up";
import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  methods: ReturnType<typeof useSignInForm>["methods"];
  onHandleSubmit: ReturnType<typeof useSignInForm>["onHandleSubmit"];
  loading: ReturnType<typeof useSignInForm>["loading"];
};

const SignInFormProvider = ({
  children,
  methods,
  onHandleSubmit,
  loading,
}: Props) => {
  // const { methods, onHandleSubmit, loading } = useSignUpForm();

  return (
    <FormProvider {...methods}>
      {/* <form onSubmit={onHandleSubmit} className="h-full"> */}
        <div className="flex flex-col justify-between gap-3 h-full">
          {/* <Loader loading={loading}>{children}</Loader> */}
          {children}
        </div>
      {/* </form> */}
    </FormProvider>
  );
};

export default SignInFormProvider;
