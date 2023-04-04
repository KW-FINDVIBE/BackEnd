import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SignUpUserInfo {
  email: string;
  password: string;
  nickname: string;
}

const SignUp: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [userDate, setUserDate] = useState<SignUpUserInfo>({
    email: "",
    password: "",
    nickname: "",
  });

  const sendSignUpRequest = async () => {
    try {
      const response = await axios.post("/api/signup", userDate);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>SignUpPage</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        go index
      </button>
      <div>Sign Up</div>
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
            value={userDate.email}
            onChange={(e) => {
              setUserDate({ ...userDate, email: e.target.value });
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
            value={userDate.password}
            onChange={(e) => {
              setUserDate({ ...userDate, password: e.target.value });
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
          <p>nickname:</p>
          <input
            value={userDate.nickname}
            onChange={(e) => {
              setUserDate({ ...userDate, nickname: e.target.value });
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          sendSignUpRequest();
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignUp;
