import Header from '@components/Header';
import { useGetAuthUserQuery } from '@services/rootApi';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const response = useGetAuthUserQuery();
  console.log(response);

  if (response.isLoading) {
    return <p>Loading...</p>;
  }

  // isLoading: nó chỉ set thành true ở lần query đầu tiên
  // isFetching: nó chỉ set thành true ở lần query đầu tiền và khi API được refresh

  // if (response?.data?._id) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
