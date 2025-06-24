import { getAllMenuFoods, getFoodDetail } from "@/apicalls/food";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllMenuFoods = (
  id: number | undefined,
  pageParam: number | 1
) => {
  const { data, isPending, refetch } = useQuery<PaginatedFoodsData>({
    queryKey: ["foods", pageParam],
    queryFn: () => getAllMenuFoods(id, pageParam),
    placeholderData: keepPreviousData,
  });
  return { data, isPending, refetch };
};

export const useGetFoodDetail = (id: number, token: string | undefined) => {
  const { data, isPending } = useQuery<Food>({
    queryKey: ["food", id],
    queryFn: () => getFoodDetail(id, token),
  });

  return { data, isPending };
};
