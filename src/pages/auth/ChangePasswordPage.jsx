import FormField from '@components/FormField';
import { Alert, Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import TextInput from '@components/FormInputs/TextInput';
import { useChangePasswordMutation } from '@services/rootApi';
import { useDispatch } from 'react-redux';
import { logOut } from '@redux/slices/authSlice';
import { useEffect } from 'react';
import { openSnackbar } from '@redux/slices/snackbarSlice';
import Sidebar from '@components/Sidebar';

const ChangePassword = () => {
  const [changePassword, { data, isError, error, isSuccess }] =
    useChangePasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .min(5, 'Password must be at least 5 characters')
      .max(160, 'Password must be at most 160 characters')
      .required('Password is required'),
    newPassword: yup
      .string()
      .min(5, 'Password must be at least 5 characters')
      .max(160, 'Password must be at most 160 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(formData) {
    console.log({ formData });
    const { oldPassword, newPassword } = formData;
    changePassword({ oldPassword, newPassword });
    // dispatch({ type: 'success', message: 'Password changed successfully' });
    // dispatch(logOut());
    // navigate('/login');
  }

  useEffect(() => {
    if (isSuccess) {
      console.log('Success:', data);
      dispatch(
        openSnackbar({
          message: data.message || 'Password changed successfully',
        }),
      );
      dispatch(logOut());
      navigate('/login');
    }
    if (isError) {
      console.log('Error:', error);
      dispatch(
        openSnackbar({
          type: 'error',
          message: error?.data?.message || 'Password is incorrect',
        }),
      );
    }
  }, [isSuccess, isError, data, error, dispatch, navigate]);

  return (
    <div className="bg-primary-bgdark container">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="rouded bg-primary-dark flex-3 !p-4">
        <p className="!mb-5 text-center text-3xl font-bold">
          Change your Password
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="oldPassword"
            label="Old Password"
            control={control}
            Component={TextInput}
            error={errors['oldPassword']}
            placeholder="Old Password"
            type="password"
          />
          <FormField
            name="newPassword"
            label="New Password"
            control={control}
            Component={TextInput}
            error={errors['newPassword']}
            placeholder="New Password"
            type="password"
          />
          <FormField
            name="confirmPassword"
            label="Confirm New Password"
            control={control}
            Component={TextInput}
            error={errors['confirmPassword']}
            placeholder="Confirm new Password"
            type="password"
          />

          <Button variant="contained" type="submit">
            Reset my Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
