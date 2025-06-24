import { getAllOrders, getOrderDetails } from "@/apicalls/order";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllOrders = (
  id: number | undefined,
  // restaurantId: number | undefined,
  pageParam: number | 1
) => {
  const { data, isPending, refetch } = useQuery<PaginatedOrdersData>({
    queryKey: ["orders", pageParam],
    queryFn: () => getAllOrders({ id, pageParam }),
    placeholderData: keepPreviousData,
  });
  return { data, isPending, refetch };
};

export const useGetOrderDetails = (
  id: number | undefined,
  token: string | undefined
) => {
  const { data, isPending } = useQuery<Order>({
    queryKey: ["order", id],
    queryFn: () => getOrderDetails({ id, token }),
  });

  return { data, isPending };
};
