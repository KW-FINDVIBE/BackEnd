import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogInUserInfo, sendLogInRequest } from "../API/auth";

const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [userData, setUserDate] = useState<LogInUserInfo>({
    email: "",
    password: "",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>loginPage</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        go index
      </button>
      <div
        style={{
          border: 1,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p>email:</p>
          <input
            value={userData.email}
            onChange={(e) => {
              setUserDate({ ...userData, email: e.target.value });
            }}
          />
        </div>
      </div>
      <div
        style={{
          border: 1,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p>psword:</p>
          <input
            value={userData.password}
            onChange={(e) => {
              setUserDate({ ...userData, password: e.target.value });
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          sendLogInRequest(userData).then((res) => {
            if (res.success) {
              navigate("/Home");
            }
          });
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Login;
