"use client";
import { Input } from "@afs/components/ui/input";
import { Label } from "@afs/components/ui/label";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@afs/components/ui/textarea";
import { UserRegistrationProps } from "@afs/schems/auth-schema";



type Props = {
  type: "text" | "email" | "password";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: keyof UserRegistrationProps;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  form?: string;
  setUserDetails?: UseFormSetValue<UserRegistrationProps>;
};

const FormGenerator = ({
  type,
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  lines,
  form,
  setUserDetails,
}: Props) => {
  switch (inputType) {
    case "input":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            form={form}
            {...register(name, {
              onChange: (e : React.ChangeEvent<HTMLInputElement>) : void =>
                setUserDetails && setUserDetails(name, e.target.value),
            })}
          />

          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? "" : message}
                </p>
              )
            )}
          />
        </Label>
      );

    case "select":
      return (
        <>
          <Label htmlFor={`select-${label}`}>{label && label}</Label>
          <select form={form} id={`select-${label}`} {...register(name)}>
            {options?.length &&
              options.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </>
      );
    case "textarea":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Textarea
            form={form}
            id={`input-${label}`}
            placeholder={placeholder}
            {...register(name)}
            rows={lines}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    default:
      return <></>;
  }
};

export default FormGenerator;
