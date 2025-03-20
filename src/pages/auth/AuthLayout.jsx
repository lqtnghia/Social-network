import { Outlet } from 'react-router-dom';

import { Suspense } from 'react';
import Loading from '@components/Loading';

const AuthLayout = () => {
  return (
    <div>
      <div className="bg-dark-200 flex h-screen items-center justify-center">
        <div className="h-fit w-[450px] bg-white px-8 py-10">
          <img src="/Logo.png" className="mx-auto mb-6 w-full" />
          <Suspense fallback={<Loading/>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
