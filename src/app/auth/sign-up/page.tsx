'use client'
import SignUpFormProvider from '@afs/components/forms/sign-up/sign-up-form'
import RegistrationFormStep from '@afs/components/forms/sign-up/registration-setp'

import React from 'react'
import ButtonHandler from '@afs/components/forms/sign-up/button-handler'
import HighLightBar from '@afs/components/forms/sign-up/highlight-bar'

// type Props = {}

const SignUp = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignUpFormProvider>
          <div className="flex flex-col gap-3">
            <RegistrationFormStep />
            <ButtonHandler />
          </div>
          <HighLightBar />
        </SignUpFormProvider>
      </div>
    </div>
  )
}

export default SignUp
