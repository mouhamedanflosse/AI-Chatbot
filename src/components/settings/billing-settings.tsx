import { getUserPlan } from '@afs/actions/settings'
import React from 'react'

export default function billingSettings() {

    const plan = getUserPlan()

  return (
    <div>
      hello world
    </div>
  )
}
