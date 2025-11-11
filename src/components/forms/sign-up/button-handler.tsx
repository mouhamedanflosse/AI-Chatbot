"use client";

import { Button } from "@afs/components/ui/button";
import { useAuthContextHook } from "@afs/context/use-auth-context";
import useSignUpForm from "@afs/hooks/use-sign-up";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

type Props = {
  methods: ReturnType<typeof useSignUpForm>["methods"];
  onHandleSubmit: ReturnType<typeof useSignUpForm>["onHandleSubmit"];
  loading: ReturnType<typeof useSignUpForm>["loading"];
  onGenerateOTP: ReturnType<typeof useSignUpForm>["onGenerateOTP"];
};

function ButtonHandler({
  methods,
  onHandleSubmit,
  loading,
  onGenerateOTP,
}: Props) {
  const { currentStep, setCurrentStep } = useAuthContextHook();
  const { formState, getFieldState, getValues } = useFormContext();
  // const {methods} = useSignUpForm()
  // const { onGenerateOTP } = useSignUpForm();

  const { isDirty: isName } = getFieldState("fullname", formState);
  const fullName = getFieldState("fullname", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);

  switch (currentStep) {
    case 2:
      return (
        <div className="w-full flex flex-col gap-3 items-center">
          <Button
            type="button"
            className="w-full bg-[hsl(var(--primary))]/80 border py-1 cursor-pointer"
            variant="default"
            onClick={() => {
              console.log(fullName, getValues());
              // console.log("methods" , methods.getValues())
              if (isName && isEmail && isPassword) {
                console.log(
                  "you did successfully push the MF button but and the function has been triggered"
                );
                onGenerateOTP(
                  getValues("email"),
                  getValues("password"),
                  setCurrentStep
                );
              }
            }}
          >
            Create an account
          </Button>
          <div>
            already have an account?{" "}
            <span className="text-[hsl(var(--primary))] font-bold">
              <Link href="/auth/sign-in">Log in</Link>
            </span>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="w-full flex flex-col gap-3 items-center">
          <Button
            type="submit"
            className="w-full bg-[hsl(var(--primary))]/80 border py-1 cursor-pointer"
            variant="default"
          >
            Create an account
          </Button>
          <div>
            already have an account?{" "}
            <span className="text-[hsl(var(--primary))] font-bold">
              <Link href="/auth/sign-in">Log in</Link>
            </span>
          </div>
        </div>
      );
  }

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Button
        className="w-full bg-[hsl(var(--primary))]/80 border py-1 cursor-pointer"
        variant="default"
        onClick={() => setCurrentStep(2)}
      >
        continue
      </Button>
      <div>
        already have an account?{" "}
        <span className="text-[hsl(var(--primary))] font-bold">
          <Link href="/auth/sign-in">Log in</Link>
        </span>
      </div>
    </div>
  );
}

export default ButtonHandler;
