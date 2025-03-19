import Header from '@components/Header';
import Loading from '@components/Loading';
import { useGetAuthUserQuery } from '@services/rootApi';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const response = useGetAuthUserQuery(undefined, {
    refetchOnMountOrArgChange: true, // Đảm bảo gọi lại khi refresh trang
  });
  console.log('Response from useGetAuthUserQuery:', response);

  if (response.isLoading) {
    return <Loading />;
  }
  //   // isLoading: nó chỉ set thành true ở lần query đầu tiên
  //   // isFetching: nó chỉ set thành true ở lần query đầu tiền và khi API được refresh

  if (response.isError) {
    console.log('Error:', response.error);
    if (response.error.status === 401) {
      return <Navigate to="/login" />;
    }
    return <p>Error: {response.error.message}</p>;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
