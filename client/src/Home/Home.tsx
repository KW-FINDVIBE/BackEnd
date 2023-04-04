import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  sendLoginCheckRequest,
  sendLogOutRequest,
  sendRefreshTokenRequest,
} from "../API/auth";

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState<boolean>();

  const checkJWTToken = () => {
    sendLoginCheckRequest().then((res1) => {
      if (!res1.success) {
        sendRefreshTokenRequest().then((res2) => {
          if (!res2.success) {
            sendLogOutRequest().then((res) => {
              if (res.success) {
                navigate("/login");
              }
            });
          }
          setIsLogin(false);
        });
      } else {
        setIsLogin(true);
        setUserName(res1.other.nickname);
      }
    });
  };

  useEffect(() => {
    checkJWTToken();
  }, []);

  useEffect(() => {
    if (isLogin == undefined || isLogin == true) {
      return;
    }
    setIsLogin(undefined);
    checkJWTToken();
  }, [isLogin]);

  return (
    <div>
      <div>로그인 성공해서 Home으로 왔음!</div>
      {isLogin && <div>{userName}님의 로그인!</div>}
      <button
        onClick={() => {
          sendLogOutRequest().then((res) => {
            if (res.success) {
              navigate("/login");
            }
          });
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Home;
