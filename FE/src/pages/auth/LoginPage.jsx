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
    defaultValues: {
      email: '',
      password: '',
    },
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
          flow: 'login',
        },
      });
    }
  }, [isError, dispatch, error, data, navigate, isSuccess, getValues]);

  return (
    <div className="rounded !p-4">
      <p className="!mb-5 text-center text-3xl font-bold">
        Login into your password
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors['email']}
          placeholder="Your Email Address"
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          error={errors['password']}
          placeholder="Password"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-slate-400">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-slate-400">
            Forgot your Password?
          </Link>
        </div>
        <Button variant="contained" type="submit">
          {isLoading && <CircularProgress size="20px" className="mr-1" />}
          Sign in
        </Button>
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
      </form>
      <p className="!mt-4 text-slate-400">
        Don't have account?{' '}
        <Link to="/register" className="!text-primary-main font-bold">
          Register
        </Link>
      </p>
      <p className="!my-4 text-center text-slate-400">
        Or, Sign in with your social account
      </p>
      <div className="flex flex-col gap-4">
        <Button variant="contained" className="flex items-center">
          <img className="!h-9 !w-9" src="/gg.png" />
          <span className="flex-1">Sign in with Google</span>
        </Button>
        <Button
          variant="contained"
          sx={{ background: '#293145' }}
          className="flex items-center gap-5"
        >
          <img className="!h-9 !w-9" src="/fb.png" />
          <span className="flex-1">Sign in with Facebook</span>
        </Button>
      </div>
    </div>
  );
};
export default LoginPage;
