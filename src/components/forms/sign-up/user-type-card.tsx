"use client";
import { Card, CardContent, CardDescription } from "@afs/components/ui/card";
import { Input } from "@afs/components/ui/input";
import { Label } from "@afs/components/ui/label";
import { cn } from "@afs/lib/utils";
import { UserRegistrationProps } from "@afs/schems/auth-schema";
import { User } from "lucide-react";
import React from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<UserRegistrationProps>;
  userType: "owner" | "student";
  setUserType: UseFormSetValue<UserRegistrationProps>;
};

const UserTypeCard = ({
  register,
  setUserType,
  text,
  title,
  userType,
  value,
}: Props) => {
  return (
    <Label htmlFor={value} className="mt-6">
      <Card
        className={cn(
          "w-full cursor-pointer py-2 px-2",
          userType == value
            ? "border-[hsl(var(--primary))]"
            : "border-[hsl(var(--primary))]/30"
        )}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={cn(
                "flex justify-center p-3",
                userType == value
                  ? "border-[hsl(var(--primary))]"
                  : "border-[hsl(var(--primary))]/30"
              )}
            >
              <User
                size={30}
                className={cn(
                  userType == value
                    ? "text-[hsl(var(--primary))]"
                    : "text-gray-400"
                )}
              />
            </Card>
            <div className="">
              <CardDescription className="text-iridium">
                {title}
              </CardDescription>
              <CardDescription className="text-[hsl(var(--accent))]">
                {text}
              </CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                "w-4 h-4 rounded-full",
                userType == value ? "bg-accent" : "bg-background"
              )}
            >
              <Input
                {...register("type", {
                  onChange: (event) => setUserType("type", event.target.value),
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};

export default UserTypeCard;
