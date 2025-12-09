"use server";

import client from "@afs/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type errorResponse = {
  code: number;
  message: string;
};

export const getUserPlan = async () => {
  try {
    const user = await currentUser();

    console.log("userId :", user?.id);
    if (!user) {
      throw { code: 401, meesage: "bad internet" };
    }

    const plan = await client.user.findFirst({
      where: {
        clerkId: user?.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },

        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (plan) return plan;
  } catch (error) {
    const err = error as errorResponse;
    if (err?.code && err.code == 401) return { status: 401, message: err.message };
    return { status: 400, message: "bad requsts LOL" };
  }
};
