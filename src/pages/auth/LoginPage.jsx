import FormField from '@components/FormField';
import TextInput from '@components/FormInputs/TextInput';
import { Alert, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
// import { login } from '@redux/slices/authSlice';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from '@services/rootApi';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '@redux/slices/snackbarSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { data = {}, isLoading, error, isError, isSuccess }] =
    useLoginMutation();

  const formSchema = yup.object().shape({
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
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  function onSubmit(formData) {
    console.log({ formData });
    login(formData);
  }

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: 'error', message: error?.data?.message }));
    }
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message })); // type đã set success mặc định trong store
      navigate('/verify-otp', {
        state: {
          email: getValues('email'),
        },
      });
    }
  }, [isError, dispatch, error, data, navigate, isSuccess, getValues]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          type="password"
          Component={TextInput}
          error={errors['password']}
        />
        <Button variant="contained" type="submit">
          {isLoading && <CircularProgress size="20px" className="mr-1" />}
          Sign in
        </Button>
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
      </form>
      <p className="mt-4">
        New on our platform? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};
export default LoginPage;
