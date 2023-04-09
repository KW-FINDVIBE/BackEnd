import { sendMultipartRequest } from "./api";

export const sendSearchRequest = (imageFile: File) => {
  return sendMultipartRequest("/search", imageFile);
};
