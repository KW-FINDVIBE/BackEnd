import axios from "axios";

export const sendPostRequest = async (path: string, sendData: any | null) => {
  try {
    const response = await axios.post(path, sendData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
