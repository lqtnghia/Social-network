import FormField from '@components/FormField';
import { Alert, Button } from '@mui/material';
import TextInput from '@components/FormInputs/TextInput';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@services/rootApi';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '@redux/slices/snackbarSlice';
import { Password } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { data = {}, isLoading, error, isError, isSuccess }] =
    useRegisterMutation();

  const formSchema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    email: yup
      .string()
      .email('Email is not valid') // Kiểm tra định dạng email tự động
      .required('Email is required'),
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
  });

  function onSubmit(formData) {
    console.log({ formData });
    register(formData);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate('/login');
    }
  }, [isSuccess, data.message, dispatch, navigate]);

  console.log(data, isLoading, errors);
  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Register</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="fullName"
          label="Full Name"
          control={control}
          Component={TextInput}
          error={errors['fullName']}
        />
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors['email']}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          Component={TextInput}
          error={errors['password']}
          type="password"
        />
        <Button variant="contained" type="submit">
          Sign up
        </Button>
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/login">Sign in instead</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
