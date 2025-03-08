import FormField from '@components/FormField';
import { Button } from '@mui/material';
import TextInput from '@components/FormInputs/TextInput';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useRegisterMutation } from '@services/rootApi';

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();
  const [register, { data, isLoading }] = useRegisterMutation();

  function onSubmit(formData) {
    console.log({ formData });
  }

  console.log(data, isLoading);
  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Register</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="fullName"
          label="Full Name"
          control={control}
          Component={TextInput}
        />
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          Component={TextInput}
          type="password"
        />
        <Button variant="contained" type="submit">
          Sign up
        </Button>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/login">Sign in instead</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
