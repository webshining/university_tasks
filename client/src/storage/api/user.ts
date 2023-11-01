import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../base";
import { UsersState } from "./../../types/users";

export const usersAPI = createApi({
	reducerPath: "usersAPI",
	baseQuery: axiosBaseQuery(),
	tagTypes: ["Users"],
	endpoints: (build) => ({
		getUsers: build.query<UsersState, void>({
			query: () => ({
				url: "/users",
			}),
			providesTags: () => ["Users"],
		}),
	}),
});

export const { useGetUsersQuery } = usersAPI;
