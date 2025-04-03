import FriendRequest from '@components/FriendRequest/FriendRequest';
import PostCreation from '@components/Post/PostCreation';
import PostList from '@components/Post/PostList';
import Sidebar from '@components/Sidebar/Sidebar';
import StoryList from '@components/Story/StoryList';

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
