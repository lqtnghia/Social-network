import FriendList from '@components/Friend/FriendList';
import FriendRequest from '@components/Friend/FriendRequest/FriendRequest';
import PostCreation from '@components/Post/PostCreation';
import PostList from '@components/Post/PostList';
import Sidebar from '@components/Sidebar/Sidebar';
import StoryList from '@components/Story/StoryList';

function HomePage() {
  return (
    <div className="bg-primary-bgdark flex !p-6">
      <div className="fixed left-0">
        <Sidebar />
      </div>
      <div className="!m-auto w-full sm:w-[50%]">
        {/* <StoryList /> */}
        <PostCreation />
        <PostList />
      </div>
      <div className="fixed right-0 hidden sm:block">
        <FriendRequest />
        <FriendList />
      </div>
    </div>
  );
}

export default HomePage;
