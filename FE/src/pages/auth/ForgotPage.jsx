import React from 'react';
import { Alert, Button, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useForgotPasswordMutation } from '@services/rootApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { openSnackbar } from '@redux/slices/snackbarSlice';
import TextInput from '@components/FormInputs/TextInput';
import FormField from '@components/FormField';

const ForgotPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgotPassword, { data, isError, error, isSuccess, isLoading }] =
    useForgotPasswordMutation();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email is not valid') // Kiểm tra định dạng email tự động
      .required('Email is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(formData) {
    console.log('Form data:', formData);
    forgotPassword(formData);
  }

  useEffect(() => {
    console.log('useEffect triggered:', { isSuccess, isError, data, error });
    if (isError) {
      dispatch(openSnackbar({ type: 'error', message: error?.data?.message }));
    }
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate('/verify-otp', {
        state: {
          email: getValues('email'),
          flow: 'forgot-password',
        },
      });
    }
  }, [isError, dispatch, error, data, navigate, isSuccess, getValues]);

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
          {isLoading && <CircularProgress size="20px" className="mr-1" />}
          Reset my Password
        </Button>
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
      </form>
      <p className="!mt-4 text-slate-400">
        Already have account?{' '}
        <Link to="/login" className="!text-primary-main font-bold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPage;
