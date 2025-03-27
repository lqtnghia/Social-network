import FormField from '@components/FormField';
import { Alert, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import TextInput from '@components/FormInputs/TextInput';
import { useResetPasswordMutation } from '@services/rootApi';

const ResetPassword = () => {
  // eslint-disable-next-line no-unused-vars
  const [resetPassword, { data, isError, error }] = useResetPasswordMutation();

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .min(5, 'Password must be at least 5 characters')
      .max(160, 'Password must be at most 160 characters')
      .required('Password is required'),
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
    resetPassword(formData);
  }

  return (
    <div className="rouded !p-4">
      <p className="!mb-5 text-center text-3xl font-bold">
        Reset Your Password
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="new-password"
          label="New Password"
          control={control}
          Component={TextInput}
          error={errors['password']}
          placeholder="New Password"
          type="password"
        />
        <FormField
          name="comfirm-new-password"
          label="Comfirm New Password"
          control={control}
          Component={TextInput}
          error={errors['password']}
          placeholder="Comfirm new Password"
          type="password"
        />
        <div className="flex items-center gap-1">
          <input type="checkbox" id="cbregister" />
          <label htmlFor="cbregister" className="text-slate-400">
            Accept Term and Conditions
          </label>
        </div>

        <Button variant="contained" type="submit">
          Reset your Password
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

export default ResetPassword;
