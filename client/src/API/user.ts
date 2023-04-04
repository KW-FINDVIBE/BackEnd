import axios from "axios";
import { sendPostRequest } from "./api";

export interface SignUpUserInfo {
  email: string;
  password: string;
  nickname: string;
}

export const sendSignUpRequest = (userInfo: SignUpUserInfo) => {
  return sendPostRequest("/user/signup", userInfo);
};
