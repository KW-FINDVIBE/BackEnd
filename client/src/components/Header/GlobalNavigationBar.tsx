import LogoSvg from "../../assets/Svg/LogoSvg";
import GridLayout from "./../Layout/GridLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { throttle } from "lodash";

const GlobalNavigationBar: React.FunctionComponent = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();
  let before = 0;
  let diff = 0;
  const handleScroll = () => {
    if (!window.scrollY) {
      return;
    }
    diff = window.scrollY - before;
    before = window.scrollY;
    if (diff > 0) {
      setHeaderHeight(64);
    } else {
      setHeaderHeight(0);
    }
  };
  const throttleHandle = throttle(handleScroll, 150);
  useEffect(() => {
    document.addEventListener("scroll", throttleHandle);
    return () => document.removeEventListener("scroll", throttleHandle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <nav
      className="fixed z-50 w-full h-[64px] bg-white flex items-center justify-center text-[0.875em] whitespace-pre origin-top duration-400"
      style={{
        transition: "0.4s ease",
        transform: `translateY(-${headerHeight}px)`,
        boxShadow: headerHeight ? "" : "0px 5px 5px rgba(0, 0, 0, 0.12)",
      }}
    >
      <GridLayout>
        <button className="justify-self-start">
          <LogoSvg />
        </button>
        <div className="ml-[20px] col-start-4 w-[220px] flex items-center justify-between ">
          <button>후기</button>
          <button onClick={() => navigate("/hotplace")}>인기장소</button>
          <button>장소찾기</button>
        </div>

        <div className="col-start-12 justify-self-end justify-between w-[150px] flex">
          <button onClick={() => navigate("/signin")}>로그인</button>
          <button
            className="bg-gradient-to-r from-deeporange to-shalloworange px-4 py-2 rounded-full text-white flex items-center justify-center font-bold"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>
      </GridLayout>
    </nav>
  );
};

export default GlobalNavigationBar;
