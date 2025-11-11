import { USER_REGISTRATION_FORM } from "@afs/constants/form-generator";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import FormGenerator from "../form-generator";
import { UserRegistrationProps } from "@afs/schems/auth-schema";
import useSignUpForm from "@afs/hooks/use-sign-up";

type Props = {
  register: UseFormRegister<UserRegistrationProps>;
  errors: FieldErrors<FieldValues>;
  setUserDetails: UseFormSetValue<UserRegistrationProps>;
};

function AccountDetailsForm({ register, errors, setUserDetails }: Props) {

  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Account details</h2>
      <p className="text-iridium md:text-sm">Enter your email and password</p>
        {USER_REGISTRATION_FORM.map((field) => (
          <FormGenerator
            key={field.id}
            {...field}
            errors={errors}
            register={register}
            name={field.name as keyof UserRegistrationProps}
            setUserDetails={setUserDetails}
          />
        ))}
    </>
  );
}

export default AccountDetailsForm;
