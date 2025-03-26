import { Link, Outlet } from 'react-router-dom';

import { Suspense } from 'react';
import Loading from '@components/Loading';

const AuthLayout = () => {
  return (
    <div>
      <div className="flex min-h-screen text-black">
        <div className="h-screen w-1/2 bg-[url('/login-bg.jpg')] bg-cover bg-center">
          <Link to="/" className="absolute top-8 left-8">
            <p className="text-primary-main font-['Fredoka_One'] text-3xl font-bold">
              NghiaSocial
            </p>
          </Link>
        </div>
        <div className="flex w-1/2 items-center justify-center bg-white px-8 py-10">
          <div className="w-[450px]">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
