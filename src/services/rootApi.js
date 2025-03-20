import { login, logOut } from '@redux/slices/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  // prepareHeaders: Hàm này cho phép tùy chỉnh các header của yêu cầu HTTP trước khi gửi đi.
  prepareHeaders: (headers, { getState }) => {
    console.log({ store: getState() });
    const token = getState().auth.accessToken;
    // console.log('Access token:', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithForceReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log('baseQueryWithForceReauth', { result });

  if (
    result?.error?.status === 401 &&
    result?.error?.data?.message === 'Token has expired.'
  ) {
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
  }
  return result;
};

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithForceReauth,
  tagTypes: ['Posts'], // Định nghĩa tag cho posts
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
      verifyOTP: builder.mutation({
        query: ({ email, otp }) => {
          return {
            url: '/verify-otp',
            body: { email, otp },
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
        invalidatesTags: ['Posts'], // Invalidates cache của tag 'Posts' khi mutation thành công
      }),
      getPosts: builder.query({
        query: ({ limit, offset } = {}) => {
          return {
            url: '/posts',
            // method: "GET",
            params: { limit, offset },
          };
        },
        providesTags: ['Posts'],
        // providesTags: [{ type: 'Posts' }], // Gắn tag 'Posts' cho query này
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useGetAuthUserQuery,
  useCreatePostMutation,
  useRefreshTokenMutation,
  useGetPostsQuery,
} = rootApi;
// khi các hook được sử dụng trong component thì rtk sẽ gọi baseQueryWithForceLogout
