import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import dashboard from "../../assets/images/dashboard.png";
import logo from "../../assets/images/logo.png";
type props = {
  children: React.ReactNode;
};

const layout = async ({ children }: props) => {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="h-screen w-full flex justify-center">
        <div className="flex flex-col p-6 ld:w-full item-start">
          <Image
            alt="logo"
            sizes="100vw"
            style={{
              width: "20%",
              height: "auto",
            }}
            src={logo}
            className=""
            width={0}
            height={0}
          />
          {children}
        </div>
        <div className="hidden lg:flex flex-1 w-full max-h-full max-w-[4000px] overflow-hidden relative bg-cream">
          <div className="flex-col pt-10 pl-24 gap-3">
            <h2 className="text-gravel md:text-4xl font-bold">
              Hi, I’m your AI powered sales assistant, Corinna!
            </h2>
            <p className="text-iridium md:text-sm mb-10">
              Corinna is capable of capturing lead information without a form...{" "}
              <br />
              something never done before 😉
            </p>
            <Image
              src={dashboard}
              alt="app_image"
              loading="lazy"
              sizes="30"
              className="absolute shrink-0 !w-[1600px] top-48"
              width={0}
              height={0}
            />
          </div>
        </div>
      </div>
    );
  }

  return redirect("/n");
};

export default layout;