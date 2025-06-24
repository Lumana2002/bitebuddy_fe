import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/client/axios";
//   restaurants/2302/menus/4
export const createMenu = async (data: {
  restaurantId: number | undefined;
  body: {
    name: string;
    restaurant: {
      restaurantId: number | undefined;
    };
  };
  token: string | undefined;
}) => {
  try {
    const response = await PostRequest(
      `/api/restaurants/${data.restaurantId}/menus`, // change how the id is obtained when menu is created
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

export const getAllMenus = async (token: string) => {
  try {
    const response = await GetRequest(
      `/api/menus`,
      {},
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

export const getMenuDetail = async (id: number, token: string | undefined) => {
  try {
    const response = await GetRequest(
      `/api/menus/${id}`,
      {
        // MenuId: id,
      },
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
export const getRestaurantMenus = async (
  restaurantId: number | undefined,
  // token: string | undefined,
  page: number | 1
) => {
  try {
    const response = await GetRequest(
      `/api/restaurants/${restaurantId}/menus`,
      { page: page },
      {}
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const updateMenu = async (
  data: {
    restaurantId: number | undefined;
    menuId: number | undefined;
    body: any;
  },
  token: string
) => {
  try {
    const response = await PutRequest(
      `/api/restaurants/${data.restaurantId}/menus/${data.menuId}`,
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

// export const deleteMenu = async (id: number, token: string) => {
//   try {
//     const response = await DeleteRequest(`/api/menus/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error?.message);
//   }
// };
