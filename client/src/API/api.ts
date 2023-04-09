import axios from "axios";

export const sendPostRequest = async (path: string, sendData: any | null) => {
  try {
    const response = await axios.post(path, sendData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// image file을 포함하는 요청 -> multipart로 구현
export const sendMultipartRequest = async (path: string, formData?: File) => {
  const form = new FormData();

  if (!formData) {
    console.log("no ImgFile!");
    return;
  }

  console.log(formData.name);

  form.append("image", formData, formData.name);

  try {
    const response = await axios({
      method: "POST",
      url: `${path}`,
      /* 아래와 같이 헤더 설정하면 boundary가 빠져서 서버가 에러를 뱉어낸다
      headers: {
        "Content-Type": "multipart/form-data",
      },
      */
      data: form,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
