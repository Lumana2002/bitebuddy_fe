import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/client/axios";

export const createRestaurant = async (data: {
  data: any;
  token: string | undefined;
}) => {
  try {
    const response = await PostRequest(
      `/api/restaurants`,
      { ...data.data },
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

export const getAllRestaurants = async (pageParam: number | 1) => {
  try {
    const response = await GetRequest(
      `/api/restaurants`,
      { page: pageParam },
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getRestaurantDetail = async (id: number) => {
  try {
    const response = await GetRequest(
      `/api/restaurants/${id}`,
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

export const updateRestaurant = async (data: {
  id: number | undefined;
  data: any;
  token: string | undefined;
}) => {
  try {
    console.log(data);
    const response = await PatchRequest(
      `/api/restaurants/${data.id}`,
      { ...data.data },
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

export const deleteRestaurant = async (data: {
  id: number;
  token: string | undefined;
}) => {
  try {
    const response = await DeleteRequest(`/api/restaurants/${data.id}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getRestUser = async (data: {
  id: number | undefined;
  token: string | undefined;
}) => {
  try {
    const response = await GetRequest(
      `/api/restaurants/user/${data.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getRestaurantRecommendation = async (data: {
  // id: number | undefined;
  userOrders: Order[] | undefined;
  token: string | undefined;
}) => {
  try {
    const userOrdersArray = data.userOrders
      ? Object.values(data.userOrders)
      : [];
    console.log(userOrdersArray);
    const response = await PostRequest(
      `/api/recommendations/restaurant`,
      userOrdersArray,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
