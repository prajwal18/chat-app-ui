import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtAxios from "../../utils/jwtAxios";
import { endpoints } from "../../utils/endpoint";

export type InterlocutorType = {
  id: number;
  email: string;
  name: string;
};

type initialStateType = {
  interlocutor: InterlocutorType | null;
  isLoadingUsers: boolean;
  isLoadingActiveUsers: boolean;
  users: Array<InterlocutorType>;
  activeUsers: Array<number>;
  searchTerm: string;
};

const initialState: initialStateType = {
  interlocutor: null,
  users: [],
  activeUsers: [],
  isLoadingUsers: false,
  isLoadingActiveUsers: false,
  searchTerm: "",
};

// Action Type
type SetSearchTermAT = {
  type: any;
  payload: string;
};
type SetUsersAT = {
  type: any;
  payload: Array<InterlocutorType>;
};
type SetActiveUsersAT = {
  type: any;
  payload: Array<number>;
};

type FetchAllUsersAT = {
  type: any;
  payload: Array<InterlocutorType>;
};
type FetchAllActiveUsersAT = {
  type: any;
  payload: Array<number>;
};
// Action Type

// Thunk Actions
const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", async () => {
  const { data } = await jwtAxios.get(endpoints.user.users);
  return data;
});
const fetchAllActiveUsers = createAsyncThunk(
  "users/fetchAllActiveUsers",
  async () => {
    const { data } = await jwtAxios.get(endpoints.user.users);
    return data;
  }
);
// Thunk Actions

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setSearchTerm: (state: any, action: SetSearchTermAT) => {
      state.searchTerm = action.payload;
      return state;
    },
    setUsers: (state: any, action: SetUsersAT) => {
      state.users = action.payload;
      return state;
    },
    setActiveUsers: (state: any, action: SetActiveUsersAT) => {
      state.activeUsers = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state: any) => {
        state.isLoadingUsers = true;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state: any, action: FetchAllUsersAT) => {
          state.users = action.payload;
          state.isLoadingUsers = false;
        }
      )
      .addCase(fetchAllUsers.rejected, (state: any) => {
        state.users = [];
        state.isLoadingUsers = false;
      })
      .addCase(fetchAllActiveUsers.pending, (state: any) => {
        state.isLoadingActiveUsers = true;
      })
      .addCase(
        fetchAllActiveUsers.fulfilled,
        (state: any, action: FetchAllActiveUsersAT) => {
          state.activeUsers = action.payload;
          state.isLoadingActiveUsers = false;
        }
      )
      .addCase(fetchAllActiveUsers.rejected, (state: any) => {
        state.activeUsers = [];
        state.isLoadingActiveUsers = false;
      });
  },
});

export const selectInterlocutor = (state: any) => {
  return state.users.interlocutor;
};
export const selectActiveUsers = (state: any) => {
  return state.users.activeUsers;
};
export const selectUsers = (state: any) => {
  return state.users.users;
};
export const selectSearchTerm = (state: any) => {
  return state.users.searchTerm;
};
export const selectIsLoadingUsers = (state: any) => {
  return state.users.isLoadingUsers;
};
export const selectIsLoadingActiveUsers = (state: any) => {
  return state.users.isLoadingActiveUsers;
};

export const {} = usersSlice.actions;
export default usersSlice.reducer;
