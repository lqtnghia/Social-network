import { useGetFriendsQuery } from '@services/rootApi';

const useTotalFriend = () => {
  const { data } = useGetFriendsQuery();
  const totalFriend = data?.length || 0;
  return totalFriend;
};

export default useTotalFriend;
