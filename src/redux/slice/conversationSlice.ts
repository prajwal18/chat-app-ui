import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../utils/endpoint";
import jwtAxios from "../../utils/jwtAxios";
import { toast } from "react-toastify";

export type SenderReciverType = {
  id: number;
  name: string;
};
export type MessageType = {
  id: number;
  message: string;
  sender: SenderReciverType;
  receiver: SenderReciverType;
};

type initialStateType = {
  conversation: Array<MessageType>;
  isLoadingConversation: boolean;
};

const initialState: initialStateType = {
  conversation: [],
  isLoadingConversation: false,
};

// Action Type
type SetIsLoadingConversationAT = {
  type: string;
  payload: boolean;
};
type SetConversationAT = {
  type: string;
  payload: Array<MessageType>;
};
type FetchConversationAT = {
  type: string;
  payload: Array<MessageType>;
};
// Action Type

// Thunk Actions
export const fetchConversation = createAsyncThunk(
  "conversation/fetchConversation",
  async (interlocutor_id: number, { getState }) => {
    const url = endpoints.message.getAConversationFn(interlocutor_id);
    const { data } = await jwtAxios().get(url);
    const conversation = data.messages;
    return conversation;
  }
);
// Thunk Actions

const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialState,
  reducers: {
    setIsLoadingConversation: (
      state: any,
      action: SetIsLoadingConversationAT
    ) => {
      state.isLoadingConversation = action.payload;
      return state;
    },
    setConversation: (state: any, action: SetConversationAT) => {
      state.conversation = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversation.pending, (state: any) => {
        state.isLoadingConversation = true;
      })
      .addCase(
        fetchConversation.fulfilled,
        (state: any, action: FetchConversationAT) => {
          state.conversation = action.payload;
          state.isLoadingConversation = false;
        }
      )
      .addCase(fetchConversation.rejected, (state: any) => {
        state.conversation = [];
        state.isLoadingConversation = false;
        toast.error("Sorry! failed to load conversation.")
      });
  },
});

// Selectors
export const selectConversation = (state: any) => {
  return state.conversation.conversation;
};
export const selectIsLoadingConversation = (state: any) => {
  return state.conversation.isLoadingConversation;
};
// Selectors

export const { setIsLoadingConversation, setConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
