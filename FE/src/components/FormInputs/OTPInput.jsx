import { MuiOtpInput } from 'mui-one-time-password-input';
import React from 'react';

const OTPInput = ({ onChange, value }) => {
  return <MuiOtpInput length={6} onChange={onChange} value={value} />;
};

export default OTPInput;
