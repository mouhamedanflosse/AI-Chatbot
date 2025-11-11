"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContextHook } from "@afs/context/use-auth-context";
import TypeSelectionForm from "./type-selection-form";
import dynamic from "next/dynamic";

import { Spinner } from "@afs/components/ui/spinner";
import useSignUpForm from "@afs/hooks/use-sign-up";

const DetailedForm = dynamic(() => import("./account-details"), {
  ssr: false,
  loading: () => <Spinner />,
});
const OtpForm = dynamic(() => import("./otp-form"), {
  ssr: false,
  loading: () => <Spinner />,
});
type Props = {
  methods: ReturnType<typeof useSignUpForm>["methods"];
};

export default function RegistrationSetp({ methods }: Props) {
  // const {
  //   register,
  //   setValue,
  //   formState: { errors },
  // } = useForm();

  const [onOTP, setOnOTP] = useState<string>("opt1234");
  const [onUser, setOnUser] = useState<"owner" | "student">("owner");

  const { currentStep } = useAuthContextHook();

  // const { methods } = useSignUpForm();
  const {
    register,
    setValue,
    formState: { errors },
  } = methods;

  setValue("otp", onOTP);

  switch (currentStep) {
    case 1:
      return (
        <div>
          <TypeSelectionForm
            setUserType={setValue}
            userType={onUser}
            register={register}
          ></TypeSelectionForm>
        </div>
      );

    case 2:
      return (
        <DetailedForm
          register={register}
          errors={errors}
          setUserDetails={setValue}
        />
      );
    case 3:
      return (
        <OtpForm
          setOtp={setValue}
          register={register}
        />
      );
    case 4:
  }
}
