import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/client/axios";

export const createOrder = async (data: {
  userId: number | undefined;
  body: any;
  token: string | undefined;
}) => {
  try {
    const response = await PostRequest(
      `/api/${data.userId}/orders`,
      { ...data.body },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    console.log("API Response:", response);
    return response;
  } catch (error: any) {
    console.error("API Error:", error); 
    throw new Error(error?.message);
  }
};

export const getAllOrders = async (data: {
  id: number | undefined;
  pageParam: number | 1;
}) => {
  try {
    const response = await GetRequest(
      `/api/${data.id}/orders`,
      { page: data.pageParam },
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getOrderDetails = async (data: {
  id: number | undefined;
  token: string | undefined;
}) => {
  try {
    const response = await GetRequest(
      `/api/${data.id}/orders`,
      {},
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const updateOrder = async (data: {
  id: number | undefined;
  userId: any;
  body: any;
  token: string | undefined;
}) => {
  try {
    console.log(data);
    const response = await PatchRequest(
      `/api/${data.userId}/orders/${data.id}`,
      { ...data.body },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

// export const deleteRestaurant = async (data: {
//   id: number;
//   token: string | undefined;
// }) => {
//   try {
//     const response = await DeleteRequest(`/api/restaurants/${data.id}`, {
//       headers: {
//         Authorization: `Bearer ${data.token}`,
//       },
//     });
//     return response;
//   } catch (error: any) {
//     throw new Error(error?.message);
//   }
// };

// export const getRestUser = async (data: {
//   id: number | undefined;
//   token: string | undefined;
// }) => {
//   try {
//     const response = await GetRequest(
//       `/api/restaurants/user/${data.id}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${data.token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error?.message);
//   }
// };
