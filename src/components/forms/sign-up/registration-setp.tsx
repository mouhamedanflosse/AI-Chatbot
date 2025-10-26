"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContextHook } from "@afs/context/use-auth-context";
import TypeSelectionForm from "./type-selection-form";

// type Props = {};

export default function RegistrationSetp() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [onOTP, setOnOTP] = useState<string>();
  const [onUser, setOnUser] = useState<"owner" | "student">("owner");

  const { currentStep } = useAuthContextHook();

  setValue("otp", onOTP);

  switch (currentStep) {
    case 1:
      return (
        <div>
          <TypeSelectionForm
            setUserType={setOnUser}
            userType={onUser}
            register={register}
          ></TypeSelectionForm>
        </div>
      );

    case 2:
    case 3:
    case 4:
  }
}
