import FriendRequest from '@components/FriendRequest';
import PostCreation from '@components/PostCreation';
import PostList from '@components/PostList';
import Sidebar from '@components/Sidebar';
import StoryList from '@components/StoryList';

function HomePage() {
  return (
    <div className="bg-primary-bgdark container">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex flex-2 flex-col gap-4">
        <StoryList />
        <PostCreation />
        <PostList />
      </div>
      <div className="hidden flex-1 sm:block">
        <FriendRequest />
      </div>
    </div>
  );
}

export default HomePage;
