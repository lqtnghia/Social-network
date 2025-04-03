import { Alert, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '@services/rootApi';
import { useDispatch } from 'react-redux';

import { openSnackbar } from '@redux/slices/snackbarSlice';

import FormField from '@components/FormField';
import TextInput from '@components/FormInputs/TextInput';

const ResetPassword = () => {
  // eslint-disable-next-line no-unused-vars
  const [resetPassword, { data, isError, error }] = useResetPasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const formSchema = yup.object().shape({
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
      newPassword: '',
      confirmPassword: '',
    },
  });

  // function onSubmit(formData) {
  //   console.log({ formData });
  //   resetPassword({
  //     email,
  //     password: formData.password,
  //   }).unwrap();
  //   // Nếu thành công, hiển thị thông báo và chuyển hướng
  //   dispatch(
  //     openSnackbar({ type: 'success', message: 'Password reset successfully' }),
  //   );
  //   navigate('/login');
  // }
  const onSubmit = async (formData) => {
    console.log('Data gửi lên API /reset-password:', {
      email,
      password: formData.newPassword,
    });
    try {
      await resetPassword({
        email,
        password: formData.newPassword,
      }).unwrap();

      dispatch(
        openSnackbar({
          type: 'success',
          message: 'Password reset successfully',
        }),
      );
      navigate('/login');
    } catch (err) {
      console.error('Reset password error:', err);
      dispatch(
        openSnackbar({
          type: 'error',
          message: err?.data?.message || 'Failed to reset password',
        }),
      );
    }
  };

  return (
    <div className="rounded !p-4">
      <p className="!mb-5 text-center text-3xl font-bold">
        Reset Your Password
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          label="Confirm Password"
          control={control}
          Component={TextInput}
          error={errors['confirmPassword']}
          placeholder="Confirm Password"
          type="password"
        />
        <div className="flex items-center gap-1">
          <input type="checkbox" id="cbregister" />
          <label htmlFor="cbregister" className="text-slate-400">
            Accept Terms and Conditions
          </label>
        </div>

        <Button variant="contained" type="submit">
          Reset your Password
        </Button>
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
      </form>
      <p className="!mt-4 text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="!text-primary-main font-bold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
