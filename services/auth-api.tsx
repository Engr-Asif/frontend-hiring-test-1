import { baseAPI } from "./base-api";
import { USERS } from "./tags";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: (user: { id: string }) => ({
        url: "auth/logout",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [USERS],
    }),
    login: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    authMe: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyAuthMeQuery,
  useAuthMeQuery,
  useLoginMutation,
  useLogoutMutation,
} = authAPI;
