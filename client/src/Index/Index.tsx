import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendCheckTokenRequest } from "../Util/util";

const Index: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sendCheckTokenRequest(() => {
      navigate("/Home");
    });
  }, []);

  return (
    <div>
      <div>indexPage</div>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        go login
      </button>
    </div>
  );
};

export default Index;
