import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
  reducerPath: "user",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/user`,
    credentials: "include",
  }),

  endpoints(builder) {
    return {
      fetchProfile: builder.query({
        providesTags: ["profile"],
        query: () => ({
          url: "/me",
          method: "GET",
        }),
      }),

      updateProfile: builder.mutation({
        invalidatesTags: (resp, err, arg) => (err ? [] : ["profile"]),
        query: (args) => ({
          url: "/profile",
          method: "POST",
          body: args,
        }),
      }),

      updateAvatar: builder.mutation({
        invalidatesTags: (resp, err, arg) => (err ? [] : ["profile"]),
        query: ({ avatarData }) => ({
          url: "/avatar",
          method: "POST",
          body: avatarData,
        }),
      }),

      deleteAvatar: builder.mutation({
        invalidatesTags: (resp, err, arg) => (err ? [] : ["profile"]),
        query: () => ({
          url: "/avatar",
          method: "DELETE",
        }),
      }),

      logout: builder.mutation({
        invalidatesTags: (resp, err, arg) => (err ? [] : ["profile"]),
        query: () => ({
          url: "/logout",
          method: "POST",
        }),
      }),
    }
  },
})

export const { useFetchProfileQuery, useUpdateAvatarMutation, useDeleteAvatarMutation, useUpdateProfileMutation, useLogoutMutation } =
  userApi
