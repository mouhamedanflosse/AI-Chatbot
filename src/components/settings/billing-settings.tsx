import { getUserPlan } from "@afs/actions/settings";
import React from "react";

// type subscription =  {
//         plan: string | null;
//       } | null; ||
//       _count: {
//         domains: number;
//       };

//  type errorResponse = {
//       status: number;
//       message: string;
//     }

const billingSettings = async () => {
  const plan = await getUserPlan();

  if (!plan) {
    return <div>No plan found</div>;
  }

  return <div>it works</div>;
};

export default billingSettings;
