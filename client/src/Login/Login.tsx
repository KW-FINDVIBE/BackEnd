import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>loginPage</div>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        go index
      </button>
    </div>
  );
};

export default Login;
