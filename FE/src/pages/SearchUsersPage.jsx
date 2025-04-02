import UserCard from '@components/UserCard';
import { useSearchUsersQuery } from '@services/rootApi';
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchUsersPage = () => {
  const location = useLocation();
  const searchQuery = location?.state?.searchTerm || '';
  console.log('Search term:', searchQuery);

  if (!searchQuery) {
    return (
      <div className="container flex-col">
        <p className="text-xl font-bold text-black">Search</p>
        <p className="text-black">Please enter a search term to find users.</p>
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isFetching, error } = useSearchUsersQuery({
    limit: 10,
    offset: 0,
    searchQuery,
  });
  console.log('API response:', { data, error });

  return (
    <div className="bg-primary-bgdark container flex-col">
      <p className="text-xl font-bold">Search</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {isFetching ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error?.data?.message || 'An error occurred'}</p>
        ) : (data?.users || []).length > 0 ? (
          (data?.users || []).map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              fullName={user.fullName}
              isFriend={user.isFriend}
              requestSent={user.requestSent}
              requestReceived={user.requestReceived}
            />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchUsersPage;
