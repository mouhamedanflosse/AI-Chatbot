"use client";
import { Card, CardContent, CardDescription } from "@afs/components/ui/card";
import { Input } from "@afs/components/ui/input";
import { Label } from "@afs/components/ui/label";
import { cn } from "@afs/lib/utils";
import { User } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};

const value = "test value";

const UserTypeCard = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [onUser, setOnUser] = useState<string>("owner");

  console.log(onUser);

  return (
    <Label htmlFor={value} className="mt-6">
      <Card>
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card>
              <User size={30} />
            </Card>
            <div className="">
              <CardDescription className="text-iridium">walo</CardDescription>
              <CardDescription className="text-gray-200">walo</CardDescription>
            </div>
          </div>
          <div>
            <div>
              <Input
                {...register("type", {
                  onChange: (event) => setOnUser(event.target.value),
                })}
                value={value}
                id={onUser}
                className=""
                type="radio"
              />
              <Input
                {...register("throwVal", {
                  onChange: (event) => setOnUser(value),
                })}
                value={onUser}
                id={value}
                className=""
                type="text"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};

export default UserTypeCard;
