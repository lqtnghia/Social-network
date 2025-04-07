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
        invalidatesTags: ['POSTS'],
      }),
      getPosts: builder.query({
        query: ({ offset, limit } = {}) => {
          return {
            url: '/posts',
            params: { offset, limit },
          };
        },
        providesTags: (result, error, { offset }) =>
          result ? [{ type: 'POSTS', id: offset }, 'POSTS'] : ['POSTS'],
        refetchOnMountOrArgChange: true,
      }),
      searchUsers: builder.query({
        query: ({ offset, limit, searchQuery } = {}) => {
          // Đảm bảo searchQuery là chuỗi, nếu không thì gán giá trị mặc định là ''
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
          // { type: 'USERS', id: args },
          // { type: 'PENDING_FRIEND_REQUEST', id: 'LIST' },
          { type: 'USERS', id: args }, // Làm mất hiệu lực cho người dùng cụ thể
          { type: 'USERS', id: 'LIST' }, // Làm mất hiệu lực toàn bộ danh sách USERS
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
          { type: 'USERS', id: args }, // Làm mất hiệu lực cho người dùng cụ thể
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
          { type: 'USERS', id: args }, // Làm mất hiệu lực cho người dùng cụ thể
          { type: 'PENDING_FRIEND_REQUEST', id: args },
        ],
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
  useSearchUsersQuery,
  useSendFriendRequestMutation,
  useGetPendingFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
} = rootApi;
