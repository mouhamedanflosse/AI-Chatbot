import { getUserPlan } from '@afs/actions/settings'
import React from 'react'

const  billingSettings = async () => {

    const plan = await getUserPlan()


  return (
    <div>
    </div>
  )
}

export default billingSettings