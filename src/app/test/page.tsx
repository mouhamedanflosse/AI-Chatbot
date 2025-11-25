"use client";
import { Card, CardContent, CardDescription } from "@afs/components/ui/card";
import { Input } from "@afs/components/ui/input";
import { Button } from "@afs/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import React, { useState } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import z from "zod";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};

const value = "test value";

type testProps = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.email({ error: "invalid email" }),
  password: z
    .string()
    .min(8, "should be more then 8 charcteres")
    .max(64, "it must be less than 64 charcteres"),
});

const UserTypeCard = () => {
  const methods = useForm<testProps>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const OurAsyncOp = () => {
    console.log("done !");
  };

  const {
    register,
    formState: { errors },
    setValue,
  } = methods;
  return (
    <FormProvider {...methods}>
      <Card>
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card>
              <User size={30} />
            </Card>
            <div className="">test</div>
          </div>
          <div>
            <form onSubmit={methods.handleSubmit(OurAsyncOp)}>
              <Input
                type="email"
                placeholder="name@company.com"
                {...register("email", {
                  onChange: (e) => setValue("email", e.target.value),
                })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-red-400 mt-2">
                    {message === "Required" ? "" : message}
                  </p>
                )}
              />
              <Input
                type="password"
                placeholder="password"
                {...register("password", {
                  onChange: (e) => setValue("password", e.target.value),
                })}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-red-400 mt-2">
                    {message === "Required" ? "" : message}
                  </p>
                )}
              />

              <Button variant="outline" type="submit">
                submit
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default UserTypeCard;
