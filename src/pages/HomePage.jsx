import FriendRequest from '@components/FriendRequest';
import PostCreation from '@components/PostCreation';
import PostList from '@components/PostList';
import Sidebar from '@components/Sidebar';

function HomePage() {
  return (
    <div className="container">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex flex-2 flex-col gap-4">
        <PostCreation />
        <PostList />
      </div>
      <div className="hidden w-64 flex-1 sm:block">
        <FriendRequest />
      </div>
    </div>
  );
}

export default HomePage;
