"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@afs/components/ui/card";
import { Input } from "@afs/components/ui/input";
import { Label } from "@afs/components/ui/label";
import { Button } from "@afs/components/ui/button";
import useSignInForm from "@afs/hooks/use-sign-in";
import { USER_LOGIN_FORM } from "@afs/constants/form-generator";
import FormGenerator from "../form-generator";
import Link from "next/link";

type Props = {
  methods: ReturnType<typeof useSignInForm>["methods"];
  onHandleSubmit: ReturnType<typeof useSignInForm>["onHandleSubmit"];
  loading: ReturnType<typeof useSignInForm>["loading"];
};

export default function LoginForm({ methods, onHandleSubmit, loading }: Props) {
  //   const { methods, onHandleSubmit, loading } = useSignInForm();
  const {
    register,
    setValue,
    formState: { errors },
  } = methods;

  return (
    <>
      <Card className="w-sm mx-auto">
        <CardHeader>
          <h2 className="text-gravel md:text-4xl font-bold">Login</h2>
          <p className="text-iridium md:text-sm">
            You will receive a one time passwords
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onHandleSubmit} className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                {...register("email", {
                  onChange: (event) => {
                    setValue("email", event.target.value);
                  },
                })}
              />
              {errors.email?.message && (
                <p className="text-sm text-destructive mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                {...register("password", {
                  onChange: (event) => {
                    setValue("password", event.target.value);
                  },
                })}
              />
              {errors.password?.message && (
                <p className="text-sm text-destructive mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <div>
              <div className="w-full flex flex-col gap-3 items-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
                <p>
                  Don’t have an account?{" "}
                  <Link href="/auth/sign-up" className="font-bold text-primary">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
