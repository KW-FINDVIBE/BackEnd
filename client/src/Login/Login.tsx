import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [psword, setPsword] = useState("");

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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
            value={psword}
            onChange={(e) => {
              setPsword(e.target.value);
            }}
          />
        </div>
      </div>
      <button>로그인</button>
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
