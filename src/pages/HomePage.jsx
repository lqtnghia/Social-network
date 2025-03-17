import FriendRequest from '@components/FriendRequest';
import PostCreation from '@components/PostCreation';
import PostList from '@components/PostList';
import Sidebar from '@components/Sidebar';

function HomePage() {
  return (
    <div className="bg-dark-200 flex gap-20 !p-6">
      <Sidebar />
      <div className="flex flex-2 flex-col gap-4">
        <PostCreation />
        <PostList />
      </div>
      <div className="hidden w-64 flex-[0.7] sm:block">
        <FriendRequest />
      </div>
    </div>
  );
}

export default HomePage;
