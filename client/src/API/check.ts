import {
  sendLoginCheckRequest,
  sendLogOutRequest,
  sendRefreshTokenRequest,
} from "./auth";

export const checkJWTToken = (
  goLoginPage: () => void,
  setIsLogin: (result: boolean) => void
) => {
  sendLoginCheckRequest().then((res1) => {
    if (!res1.success) {
      // 토큰 만료 시, 재발행
      sendRefreshTokenRequest().then((res2) => {
        if (!res2.success) {
          // 재발행 토큰 만료 시, 로그아웃 + login page로 이동
          sendLogOutRequest().then((res) => {
            if (res.success) {
              goLoginPage();
            }
          });
        }
        setIsLogin(false);
      });
    } else {
      setIsLogin(true);
    }
  });
};
