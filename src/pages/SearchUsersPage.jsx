import UserCard from '@components/UserCard';
import { useUserInfo } from '@hooks/index';
import { useSearchUsersQuery } from '@services/rootApi';
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchUsersPage = () => {
  const location = useLocation();
  const { _id } = useUserInfo();

  // eslint-disable-next-line no-unused-vars
  const { data, isFetching } = useSearchUsersQuery({
    limit: 11,
    offset: 0,
    searchQuery: location?.state?.searchTerm,
  });

  console.log(data);
  return (
    <div className="container flex-col">
      <p className="text-xl font-bold">Search</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(data?.users || []).map((user) => (
          <UserCard
            key={user._id}
            fullName={user.fullName}
            isFriend={user.isFriend.includes(_id)}
          />
        ))}
        {/* <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard /> */}
      </div>
    </div>
  );
};

export default SearchUsersPage;
