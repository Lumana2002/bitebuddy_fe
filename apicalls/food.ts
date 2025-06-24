import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/client/axios";
import { headers } from "next/headers";
// /restaurants/{restaurant_id}/menus/{id}
export const createFood = async (data: any, token: string) => {
  try {
    const response = await PostRequest(
      `/api/foods`,
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const addFoodToMenu = async (data: {
  id: number | undefined;
  restaurantId: number | undefined;
  body: any;
  token: string | undefined;
}) => {
  try {
    const response = await PatchRequest(
      `/api/restaurants/${data?.restaurantId}/menus/${data?.id}`,
      { foods: [data.body] },
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

export const getAllFoods = async () => {
  try {
    const response = await GetRequest(
      `/api/foods`,
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

export const getAllMenuFoods = async (
  id: number | undefined,
  page: number | 1
) => {
  try {
    const response = await GetRequest(
      `/api/foods/menu/${id}`,
      { page: page },
      {}
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getFoodDetail = async (
  id: number | undefined,
  token: string | undefined
) => {
  try {
    const response = await GetRequest(
      `/api/foods/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const updateFood = async (data: {
  id: number;
  data: any;
  token: string | undefined;
}) => {
  try {
    const response = await PutRequest(
      `/api/foods/${data.id}`,
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

export const deleteFood = async (data: {
  id: number;
  token: string | undefined;
}) => {
  try {
    const response = await DeleteRequest(`/api/foods/${data.id}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
