import { HttpStatusCode } from "axios";
import { endpoints } from "../utils/endpoint";
import jwtAxios from "../utils/jwtAxios";

export type CreateMessageType = {
  receiver_id: number;
  message: string;
};
export const sendMessage = async (message: CreateMessageType) => { 
  const { data, status } = await jwtAxios().post(
    endpoints.message.create,
    message
  );
  if (status == HttpStatusCode.Created) {
    return data;
  } else {
    throw new Error("Sorry, failed to send the message");
  }
};
