import FormField from '@components/FormField';
import { Alert, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import TextInput from '@components/FormInputs/TextInput';
import { useForgotPasswordMutation } from '@services/rootApi';

const ForgotPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [forgotPassword, { data, isError, error }] =
    useForgotPasswordMutation();

  const formSchema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    email: yup
      .string()
      .email('Email is not valid') // Kiểm tra định dạng email tự động
      .required('Email is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(formData) {
    console.log({ formData });
    forgotPassword(formData);
  }

  return (
    <div className="rouded !p-4">
      <p className="!mb-5 text-center text-3xl font-bold">Forgot Password</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors['email']}
          placeholder="Your Email Address"
        />

        <Button variant="contained" type="submit">
          Reset my Password
        </Button>
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
      </form>
      <p className="!mt-4 text-slate-400">
        Already have account?{' '}
        <Link to="/login" className="!text-primary-main font-bold">
          {' '}
          Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPage;
