import { useState } from "react";
import FindLocationGetImageBox from "./FindLocationGetImageBox";
import GoogleMapApi from "../GoogleMap/GoogleMapApi";

const FindLocationImageHandle: React.FunctionComponent = () => {
  const [imageList, setImageList] = useState<File[]>([]);
  const getCoordinate = (length: number) => {
    return Array(length)
      .fill(0)
      .map((_, i) => ({
        lat: 0.1 * i + 37.5,
        lng: 0.1 * i + 126.988259,
      }));
  };

  return (
    <>
      <FindLocationGetImageBox
        imageList={imageList}
        setImageList={setImageList}
      />
      <GoogleMapApi
        coordinate={imageList.map((_, idx) => getCoordinate(idx + 1))}
      />
    </>
  );
};

export default FindLocationImageHandle;
