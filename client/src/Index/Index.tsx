import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index: React.FunctionComponent = () => {
  const navigate = useNavigate();

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
