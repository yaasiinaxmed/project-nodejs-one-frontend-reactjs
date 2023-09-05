import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import BASE_URL from './BASE_URL'

export const userSlice = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ["user"], 

    endpoints: (builder) => ({
         // Get all user
         getUsers: builder.query({
            query: () => {
                return {
                    url: '/api/users',
                    method: 'GET'
                }
            },
            providesTags: ["user"]
        }),

        // Create user
        addUser: builder.mutation({
            query: (newUser) => ({
                url: "/api/users/create_user",
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ["user"]
        }),

        // Update user
        updateUser: builder.mutation({
            query: ({id, updatedUser}) => ({
                url: `/api/users/update_user/${id}`,
                method: "PUT",
                body: updatedUser
            }),
            invalidatesTags: ["user"]
        }),

        // Delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/users/delete_user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["user"]
        })
    }),
});

export const {useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation} = userSlice

export default userSlice.reducer