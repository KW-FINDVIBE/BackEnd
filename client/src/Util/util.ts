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

// 서버에 전달 시, 새로운 자료형의 형태로 보내야 제대로 사용가능
export interface CheckToken {
  checkToken: string;
}

export const sendCheckTokenRequest = async (navigateHome: () => void) => {
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("find_vibe_token=")
  );
  const checkToken: CheckToken = {
    checkToken: tokenCookie?.split("=")[1] || "",
  };

  try {
    const response = await axios.post("/api/check_token", checkToken);
    if (response.data.success) {
      console.log("check success!");
      navigateHome();
    } else {
      console.log("check fail!");
    }
  } catch (error) {
    console.error(error);
  }
};
