// import Message from '@components/Message/Message';
// import MoreInfo from '@components/Message/MoreInfo';
// import SideBar from '@components/Message/SideBar';
// import React from 'react';

// const MessagePage = () => {
//   return (
//     <div className="bg-primary-bgdark flex min-h-screen !py-6">
//       {/* <div className="fixed left-0"> */}
//       <div className="bg-primary-dark fixed left-0">
//         <SideBar />
//       </div>
//       <div className="!m-auto w-full sm:w-[50%]">
//         <Message />
//       </div>
//       <div className="bg-primary-dark fixed right-0 min-h-screen">
//         <MoreInfo />
//       </div>
//     </div>
//   );
// };

// export default MessagePage;

import Message from '@components/Message/Message';
import MoreInfo from '@components/Message/MoreInfo';
import SideBar from '@components/Message/SideBar';
import React, { useState } from 'react';

const MessagePage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div className="bg-primary-bgdark flex min-h-screen !py-6">
      {/* SideBar: Danh sách cuộc trò chuyện */}
      <div className="bg-primary-dark fixed left-0 w-80">
        <SideBar
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
        />
      </div>

      {/* Message: Khu vực chat */}
      <div className="!m-auto w-full sm:w-[50%]">
        {selectedUserId ? (
          <Message selectedUserId={selectedUserId} />
        ) : (
          <div className="flex h-screen items-center justify-center">
            <p className="text-gray-500">Chọn một cuộc trò chuyện để bắt đầu</p>
          </div>
        )}
      </div>

      {/* MoreInfo: Thông tin người dùng */}
      <div className="bg-primary-dark fixed right-0 min-h-screen w-80">
        <MoreInfo selectedUserId={selectedUserId} />
      </div>
    </div>
  );
};

export default MessagePage;
