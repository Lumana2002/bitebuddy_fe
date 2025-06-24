import {
  getAllRestaurants,
  getRestUser,
  getRestaurantDetail,
  getRestaurantRecommendation,
} from "@/apicalls/restaurant";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { get } from "http";

export const useGetAllRestaurants = (page: number | 1) => {
  const { data, isPending } = useQuery<PaginatedRestaurantsData>({
    queryKey: ["restaurants", page],
    queryFn: () => getAllRestaurants(page),
    placeholderData: keepPreviousData,
  });
  return { data, isPending };
};

export const useGetRestaurant = (id: number) => {
  const { data, isPending } = useQuery<Restaurant>({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantDetail(id),
  });

  return { data, isPending };
};

export const useGetRestaurantUser = (
  id: number | undefined,
  token: string | undefined
) => {
  const { data, isPending } = useQuery<Restaurant>({
    queryKey: ["restUser", id],
    queryFn: () => getRestUser({ id, token }),
  });

  return { data, isPending };
};

export const useGetRestaurantRecommendation = ({ userOrders, token }: any) => {
  return useQuery<Restaurant[]>({
    queryKey: ["recommendations", userOrders],
    queryFn: () => getRestaurantRecommendation({ userOrders, token }),
    enabled: !!userOrders && !!token, // only run the query if userOrders and token are available
  });
};
