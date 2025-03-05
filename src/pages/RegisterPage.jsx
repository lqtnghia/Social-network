// import FormField from '@components/FormField';
// import { Button, TextField } from '@mui/material';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';

// const RegisterPage = () => {
//   const { control } = useForm();
//   return (
//     <div className="bg-dark-200 flex h-screen items-center justify-center">
//       <div className="h-fit w-[450px] bg-white px-8 py-10">
//         <img src="/Logo.png" className="mx-auto mb-6" />
//         <p className="mb-6 text-center text-2xl font-bold">Register</p>
//         <form className="flex flex-col gap-4">
//           <FormField
//             name="fullName"
//             label="Full Name"
//             control={control}
//             Component={TextField}
//           />
//           <FormField
//             name="email"
//             label="Email"
//             control={control}
//             Component={TextField}
//           />
//           <FormField
//             name="password"
//             label="Password"
//             control={control}
//             Component={TextField}
//             type="password"
//           />
//           <Button variant="contained">Sign Up</Button>
//         </form>
//         <p className="mt-6">
//           Already have an account? <Link to="/login">Sign in instead</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import FormField from '@components/FormField';
import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="bg-dark-200 flex h-screen items-center justify-center">
      <div className="h-fit w-[450px] bg-white px-8 py-10">
        <img src="/Logo.png" className="mx-auto mb-6" />
        <p className="mb-6 text-center text-2xl font-bold">Register</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="fullName"
            label="Full Name"
            control={control}
            Component={TextField}
          />
          <FormField
            name="email"
            label="Email"
            control={control}
            Component={TextField}
          />
          <FormField
            name="password"
            label="Password"
            control={control}
            Component={TextField}
            type="password"
          />
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
        <p className="mt-6">
          Already have an account? <Link to="/login">Sign in instead</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
