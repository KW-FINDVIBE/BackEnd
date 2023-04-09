import { useState } from "react";
import { sendSearchRequest } from "../API/search";

const Search: React.FunctionComponent = () => {
  const [targetImg, setTargetImg] = useState<File>();
  const [result, setResult] = useState<boolean>(false);

  const searchStart = () => {
    if (!targetImg) {
      return;
    }

    sendSearchRequest(targetImg).then((res) => {
      setResult(res.success);
    });
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        {targetImg && <img src={URL.createObjectURL(targetImg)}></img>}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (!e.target || !e.target.files || !e.target.files.length) {
              return;
            }

            // jpeg, jpg, png
            if (
              !e.target.files[0].name.toLowerCase().includes(".png") &&
              !e.target.files[0].name.toLowerCase().includes(".jpg") &&
              !e.target.files[0].name.toLowerCase().includes(".jpeg")
            ) {
              console.log("이미지만 가능!!");
              return;
            }

            setTargetImg(e.target.files[0]);
          }}
        ></input>
        <button onClick={searchStart}>검색하기</button>
      </div>
      <div className="flex flex-col">
        <div>결과</div>
        <div>{result ? "성공" : "실패"}</div>
      </div>
    </div>
  );
};

export default Search;
