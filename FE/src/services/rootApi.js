import { login, logOut } from '@redux/slices/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithForceReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    if (result?.error?.data?.message === 'Token has expired.') {
      const refreshToken = api.getState().auth.refreshToken;
      console.log('Refresh token before API call:', refreshToken);

      if (refreshToken) {
        const refreshResult = await baseQuery(
          {
            url: '/refresh-token',
            body: { refreshToken },
            method: 'POST',
          },
          api,
          extraOptions,
        );
        console.log({ refreshResult });

        const newAccessToken = refreshResult?.data?.accessToken;
        if (newAccessToken) {
          api.dispatch(
            login({
              accessToken: newAccessToken,
              refreshToken,
            }),
          );

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
          window.location.href = '/login';
        }
      } else {
        api.dispatch(logOut());
        window.location.href = '/login';
      }
      console.log({ result });
    } else {
      window.location.href = '/login';
    }
  }
  return result;
};

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithForceReauth,
  tagTypes: ['POSTS', 'USERS', 'PENDING_FRIEND_REQUEST'], // Định nghĩa tagTypes
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: ({ fullName, email, password }) => {
          return {
            url: '/signup',
            body: { fullName, email, password },
            method: 'POST',
          };
        },
      }),
      login: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: '/login',
            body: { email, password },
            method: 'POST',
          };
        },
      }),
      forgotPassword: builder.mutation({
        query: ({ email }) => {
          return {
            url: '/forgot-password',
            body: { email },
            method: 'POST',
          };
        },
      }),
      resetPassword: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: '/reset-password',
            body: { email, password },
            method: 'POST',
          };
        },
      }),
      verifyOTP: builder.mutation({
        query: ({ email, otp, flow }) => {
          return {
            url: '/verify-otp',
            body: { email, otp, flow },
            method: 'POST',
          };
        },
      }),
      changePassword: builder.mutation({
        query: ({ oldPassword, newPassword }) => {
          return {
            url: '/change-password',
            body: { oldPassword, newPassword },
            method: 'POST',
          };
        },
      }),
      refreshToken: builder.mutation({
        query: (refreshToken) => {
          return {
            url: '/refresh-token',
            body: { refreshToken },
            method: 'POST',
          };
        },
      }),
      getAuthUser: builder.query({
        query: () => {
          return '/auth-user';
        },
      }),
      createPost: builder.mutation({
        query: (formData) => {
          return {
            url: '/posts',
            body: formData,
            method: 'POST',
          };
        },
        onQueryStarted: async (
          args,
          { dispatch, queryFulfilled, getState },
        ) => {
          console.log(args);

          const store = getState();

          const tempId = crypto.randomUUID();
          const newPost = {
            tempId,
            content: args.get('content'),
            image: null,
            author: {
              id: store.auth.user.id,
              fullName: store.auth.user.fullName,
              email: store.auth.user.email,
              role: 'regular',
              image: null,
            },
            likes: [],
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          console.log(newPost);

          const patchResult = dispatch(
            rootApi.util.updateQueryData(
              'getPosts',
              { limit: 10, offset: 0 },
              (draft) => {
                // console.log(draft); // tượng trưng cho danh sách các bài post
                draft.unshift(newPost);
              },
            ),
          );
          try {
            const { data } = await queryFulfilled;
            console.log(data);
            dispatch(
              rootApi.util.updateQueryData(
                'getPosts',
                { limit: 10, offset: 0 },
                (draft) => {
                  const index = draft.findIndex((post) => post.id === tempId);
                  if (index !== -1) {
                    draft[index] = data;
                  }
                },
              ),
            );
          } catch (err) {
            console.log(err);
            patchResult.undo();
          }
        },
        // invalidatesTags: ['POSTS'],
      }),
      getPosts: builder.query({
        query: ({ offset, limit } = {}) => {
          return {
            url: '/posts',
            params: { offset, limit },
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'POSTS', id })),
                { type: 'POSTS', id: 'LIST' },
              ]
            : [{ type: 'POSTS', id: 'LIST' }],
        refetchOnMountOrArgChange: true,
      }),
      getPostById: builder.query({
        query: (id) => {
          return {
            url: `/posts/${id}`,
            method: 'GET',
          };
        },
        providesTags: (result, error, id) =>
          result ? [{ type: 'POSTS', id }, 'POSTS'] : ['POSTS'],
        refetchOnMountOrArgChange: true,
      }),
      getPostsByAuthor: builder.query({
        query: ({ authorId, offset, limit } = {}) => ({
          url: `/posts/author/${authorId}`,
          params: { offset, limit },
        }),
        providesTags: (result, error, { authorId }) =>
          result
            ? [
                ...result.posts.map(({ id }) => ({ type: 'USER_POSTS', id })),
                { type: 'USER_POSTS', id: authorId },
              ]
            : [{ type: 'USER_POSTS', id: authorId }],
        refetchOnMountOrArgChange: true,
      }),

      searchUsers: builder.query({
        query: ({ offset, limit, searchQuery } = {}) => {
          const query = typeof searchQuery === 'string' ? searchQuery : '';
          const encodedQuery = encodeURIComponent(query.trim());
          return {
            url: `/search/users/${encodedQuery}`,
            params: { offset, limit },
          };
        },
        providesTags: (result) => {
          console.log('searchUsers result:', result); // Thêm log để kiểm tra
          return result && result.users && Array.isArray(result.users)
            ? [
                ...result.users.map(({ id }) => ({ type: 'USERS', id })),
                { type: 'USERS', id: 'LIST' },
              ]
            : [{ type: 'USERS', id: 'LIST' }];
        },
        refetchOnMountOrArgChange: true, // quan trọng lúc add friend
      }),
      sendFriendRequest: builder.mutation({
        query: (userId) => {
          return {
            url: '/friends/request',
            body: {
              friendId: userId,
            },
            method: 'POST',
          };
        },
        // args chính là userId
        invalidatesTags: (result, error, args) => [
          { type: 'USERS', id: args },
          { type: 'USERS', id: 'LIST' },
          { type: 'PENDING_FRIEND_REQUEST', id: 'LIST' },
        ],
      }),
      getPendingFriendRequests: builder.query({
        query: () => {
          return {
            url: `/friends/pending`,
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: 'PENDING_FRIEND_REQUEST',
                  id,
                })),
                { type: 'PENDING_FRIEND_REQUEST', id: 'LIST' },
              ]
            : [{ type: 'PENDING_FRIEND_REQUEST', id: 'LIST' }],
        // refetchOnMountOrArgChange: true,
      }),
      acceptFriendRequest: builder.mutation({
        query: (userId) => {
          return {
            url: '/friends/accept',
            body: {
              friendId: userId,
            },
            method: 'POST',
          };
        },
        // args chính là userId
        invalidatesTags: (result, error, args) => [
          { type: 'USERS', id: args },
          { type: 'PENDING_FRIEND_REQUEST', id: args },
        ],
      }),
      cancelFriendRequest: builder.mutation({
        query: (userId) => {
          return {
            url: '/friends/cancel',
            body: {
              friendId: userId,
            },
            method: 'POST',
          };
        },
        // args chính là userId
        invalidatesTags: (result, error, args) => [
          { type: 'USERS', id: args },
          { type: 'PENDING_FRIEND_REQUEST', id: args },
        ],
      }),
      getFriends: builder.query({
        query: ({ limit = 10, offset = 0 } = {}) => {
          return {
            url: `/friends`,
            params: { offset, limit },
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.friends.map(({ id }) => ({ type: 'FRIENDS', id })),
                { type: 'FRIENDS', id: 'LIST' },
              ]
            : [{ type: 'FRIENDS', id: 'LIST' }],
        refetchOnMountOrArgChange: true,
      }),
      likePost: builder.mutation({
        query: ({ postId }) => ({
          url: `/posts/${postId}/like`,
          method: 'POST',
        }),
        onQueryStarted: async (
          { postId },
          { dispatch, queryFulfilled, getState },
        ) => {
          const userId = getState().auth.user?.id;

          // Optimistic update cho getPostById
          const patchResultPostById = dispatch(
            rootApi.util.updateQueryData('getPostById', postId, (draft) => {
              draft.likes.push({
                userId,
                postId,
                createdAt: new Date().toISOString(),
              });
            }),
          );

          // Optimistic update cho getPosts
          const patchResultPosts = dispatch(
            rootApi.util.updateQueryData(
              'getPosts',
              { limit: 10, offset: 0 },
              (draft) => {
                const postIndex = draft.findIndex((p) => p.id === postId);
                if (postIndex !== -1) {
                  draft[postIndex].likes.push({
                    userId,
                    postId,
                    createdAt: new Date().toISOString(),
                  });
                }
              },
            ),
          );

          try {
            await queryFulfilled;
          } catch (err) {
            patchResultPostById.undo();
            patchResultPosts.undo();
            console.error('Error liking post:', err);
          }
        },
        invalidatesTags: (result, error, { postId }) => [
          { type: 'POSTS', id: postId },
        ],
      }),

      unlikePost: builder.mutation({
        query: ({ postId }) => ({
          url: `/posts/${postId}/like`,
          method: 'DELETE',
        }),
        onQueryStarted: async (
          { postId },
          { dispatch, queryFulfilled, getState },
        ) => {
          const userId = getState().auth.user?.id;

          // Optimistic update cho getPostById
          const patchResultPostById = dispatch(
            rootApi.util.updateQueryData('getPostById', postId, (draft) => {
              draft.likes = draft.likes.filter(
                (like) => like.userId !== userId,
              );
            }),
          );

          // Optimistic update cho getPosts
          const patchResultPosts = dispatch(
            rootApi.util.updateQueryData(
              'getPosts',
              { limit: 10, offset: 0 },
              (draft) => {
                const postIndex = draft.findIndex((p) => p.id === postId);
                if (postIndex !== -1) {
                  draft[postIndex].likes = draft[postIndex].likes.filter(
                    (like) => like.userId !== userId,
                  );
                }
              },
            ),
          );

          try {
            await queryFulfilled;
          } catch (err) {
            patchResultPostById.undo();
            patchResultPosts.undo();
            console.error('Error unliking post:', err);
          }
        },
        invalidatesTags: (result, error, { postId }) => [
          { type: 'POSTS', id: postId },
        ],
      }),
      addComment: builder.mutation({
        query: ({ postId, comment }) => ({
          url: `/posts/${postId}/comment`,
          method: 'POST',
          body: { comment },
        }),
        onQueryStarted: async (
          { postId, comment },
          { dispatch, queryFulfilled, getState },
        ) => {
          const tempId = crypto.randomUUID();

          const store = getState();
          console.log(store);

          const newComment = {
            id: tempId,
            content: comment,
            createdAt: new Date().toISOString(),
            user: {
              id: store.auth.user?.id || 'unknown',
              fullName: store.auth.user?.fullName || 'Unknown User',
              imageAva: store.auth.user?.imageAva || null,
            },
          };

          // Optimistic update cho getPostById
          const patchResultPostById = dispatch(
            rootApi.util.updateQueryData('getPostById', postId, (draft) => {
              draft.comments.push(newComment);
            }),
          );

          // Optimistic update cho getPosts
          const patchResultPosts = dispatch(
            rootApi.util.updateQueryData(
              'getPosts',
              { limit: 10, offset: 0 },
              (draft) => {
                const postIndex = draft.findIndex((p) => p.id === postId);
                if (postIndex !== -1) {
                  draft[postIndex].comments.push(newComment);
                }
              },
            ),
          );

          try {
            const { data } = await queryFulfilled;
            // Cập nhật lại getPostById
            dispatch(
              rootApi.util.updateQueryData('getPostById', postId, (draft) => {
                const index = draft.comments.findIndex((c) => c.id === tempId);
                if (index !== -1) {
                  draft.comments[index] = data;
                }
              }),
            );

            // Cập nhật lại getPosts
            dispatch(
              rootApi.util.updateQueryData(
                'getPosts',
                { limit: 10, offset: 0 },
                (draft) => {
                  const postIndex = draft.findIndex((p) => p.id === postId);
                  if (postIndex !== -1) {
                    const commentIndex = draft[postIndex].comments.findIndex(
                      (c) => c.id === tempId,
                    );
                    if (commentIndex !== -1) {
                      draft[postIndex].comments[commentIndex] = data;
                    }
                  }
                },
              ),
            );
          } catch (err) {
            patchResultPostById.undo();
            patchResultPosts.undo();
            console.error('Error adding comment:', err);
          }
        },
        invalidatesTags: (result, error, { postId }) => [
          { type: 'POSTS', id: postId },
          { type: 'POSTS', id: 'LIST' },
        ],
      }),
      deleteComment: builder.mutation({
        query: ({ postId, commentId }) => ({
          url: `/posts/${postId}/comment/${commentId}`,
          method: 'DELETE',
        }),
        onQueryStarted: async (
          { postId, commentId },
          { dispatch, queryFulfilled },
        ) => {
          // Optimistic update cho getPostById
          const patchResultPostById = dispatch(
            rootApi.util.updateQueryData('getPostById', postId, (draft) => {
              draft.comments = draft.comments.filter((c) => c.id !== commentId);
            }),
          );

          // Optimistic update cho getPosts
          const patchResultPosts = dispatch(
            rootApi.util.updateQueryData(
              'getPosts',
              { limit: 10, offset: 0 },
              (draft) => {
                const postIndex = draft.findIndex((p) => p.id === postId);
                if (postIndex !== -1) {
                  draft[postIndex].comments = draft[postIndex].comments.filter(
                    (c) => c.id !== commentId,
                  );
                }
              },
            ),
          );
          try {
            await queryFulfilled;
          } catch (err) {
            patchResultPostById.undo();
            patchResultPosts.undo();
            console.error('Error deleting comment:', err);
          }
        },
        invalidatesTags: (result, error, { postId }) => [
          { type: 'POSTS', id: postId },
          { type: 'POSTS', id: 'LIST' },
        ],
      }),
      getUserById: builder.query({
        query: (id) => {
          return {
            url: `/users/${id}`,
            method: 'GET',
          };
        },
        providesTags: (result, error, id) =>
          result ? [{ type: 'USERS', id }, 'USERS'] : ['USERS'],
        refetchOnMountOrArgChange: true,
      }),
      // 1. Lấy tin nhắn
      getMessages: builder.query({
        query: ({ userId, offset = 0, limit = 20 }) => ({
          url: '/messages',
          params: { userId, offset, limit },
        }),
        providesTags: (result, error, { userId }) =>
          result
            ? [
                ...result.map(({ _id }) => ({ type: 'MESSAGES', id: _id })),
                { type: 'MESSAGES', id: userId },
              ]
            : [{ type: 'MESSAGES', id: userId }],
        refetchOnMountOrArgChange: true,
      }),

      // 2. Tạo tin nhắn
      createMessage: builder.mutation({
        query: ({ message, receiver }) => ({
          url: '/messages/create',
          method: 'POST',
          body: { message, receiver },
        }),
        invalidatesTags: (result, error, { receiver }) => [
          { type: 'MESSAGES', id: receiver },
          { type: 'CONVERSATIONS', id: 'LIST' },
        ],
      }),

      // 3. Lấy danh sách cuộc trò chuyện
      getConversations: builder.query({
        query: () => ({
          url: '/messages/conversations',
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ _id }) => ({
                  type: 'CONVERSATIONS',
                  id: _id,
                })),
                { type: 'CONVERSATIONS', id: 'LIST' },
              ]
            : [{ type: 'CONVERSATIONS', id: 'LIST' }],
        refetchOnMountOrArgChange: true,
      }),

      // 4. Đánh dấu tin nhắn đã xem
      markMessagesAsSeen: builder.mutation({
        query: ({ sender }) => ({
          url: '/messages/update-seen',
          method: 'PUT',
          body: { sender },
        }),
        invalidatesTags: (result, error, { sender }) => [
          { type: 'MESSAGES', id: sender },
          { type: 'CONVERSATIONS', id: 'LIST' },
        ],
      }),

      // 5. Lấy số lượng tin nhắn chưa đọc
      getUnreadCount: builder.query({
        query: () => ({
          url: '/messages/unread-count',
        }),
        providesTags: ['MESSAGES'],
        refetchOnMountOrArgChange: true,
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
  useChangePasswordMutation,
  useGetAuthUserQuery,
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostsByAuthorQuery,
  useSearchUsersQuery,
  useSendFriendRequestMutation,
  useGetPendingFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetFriendsQuery,
  useGetPostByIdQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetUserByIdQuery,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useGetConversationsQuery,
  useMarkMessagesAsSeenMutation,
  useGetUnreadCountQuery,
} = rootApi;
