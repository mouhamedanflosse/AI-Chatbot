import { UserRegistrationProps } from '@afs/schems/auth-schema';
import React from 'react'
import { UseFormRegister } from 'react-hook-form';


type Props = {
 onOtp: string;
 setOnOtp: React.Dispatch<React.SetStateAction<string>>;
};

export default function otpForm() {
  return (
    <div>
      register from otp form
    </div>
  )
}
