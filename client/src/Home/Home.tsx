import { useNavigate } from "react-router-dom";
import { sendLogOutRequest } from "../Util/util";

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>로그인 성공해서 Home으로 왔음!</div>
      <button
        onClick={() => {
          sendLogOutRequest(() => {
            navigate("/login");
          });
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Home;
