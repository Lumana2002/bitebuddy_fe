import { PostRequest } from "@/lib/axios/client/axios";

export const uploadImage = async (data: {
  data: any;
  token: string | undefined;
}) => {
  console.log(data)
  console.log(...data.data)
  try {
    const response = await PostRequest(
      `/api/files/upload`,
      data.data ,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
