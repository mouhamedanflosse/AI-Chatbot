"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import useSignInForm from "../../../hooks/use-sign-in";

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
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onHandleSubmit} className="grid gap-4">
          <div>
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

          <div>
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
            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer"
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
