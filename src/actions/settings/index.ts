"use server";

import client from "@afs/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getUserPlan = async () => {
  try {
      const user = await currentUser()
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

    if (plan) return plan.subscription?.plan;
  } catch (error) {
    return { status: 400, message: "bad requsts LOL" };
  }
};
