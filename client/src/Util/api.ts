import axios from "axios";
import { LogInUserInfo } from "../Login/Login";

export const sendLogInRequest = async (
  userData: LogInUserInfo,
  navigateHome: () => void
) => {
  try {
    const response = await axios.post("/api/login", userData);
    if (response.data.success) {
      console.log("login success!");
      navigateHome();
    } else {
      console.log("login fail!");
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendLogOutRequest = async (navigateLogin: () => void) => {
  try {
    const response = await axios.post("/api/logout");
    if (response.data.success) {
      console.log("logout success!");
      navigateLogin();
    } else {
      console.log("logout fail!");
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendLoginSuccessRequest = async () => {
  try {
    const response = await axios.post("/api/login/success");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendRefreshTokenRequest = async () => {
  try {
    const response = await axios.post("/api/token/refresh");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
