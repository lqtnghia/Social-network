import Header from '@components/Header/Header';
import Loading from '@components/Loading/Loading';
import SocketProvider from '@context/SocketProvider';
import { useGetAuthUserQuery } from '@services/rootApi';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const response = useGetAuthUserQuery(undefined, {
    refetchOnMountOrArgChange: true, // Đảm bảo gọi lại khi refresh trang
  });
  // console.log('Response from useGetAuthUserQuery:', response);

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
    // <SocketProvider>
    //   <div>
    //     <Header />
    //     <div className="!mt-20">
    //       <Outlet />
    //     </div>
    //   </div>
    // </SocketProvider>
    <div>
      <Header />
      <div className="!mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
