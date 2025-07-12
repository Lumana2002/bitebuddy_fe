import { getAllOrders, getOrderDetails } from "@/apicalls/order";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetAllOrders = (
  id: number | undefined,
  // restaurantId: number | undefined,
  pageParam: number | 1
) => {
  const { data: session } = useSession();
  const { data, isPending, refetch } = useQuery<PaginatedOrdersData>({
    queryKey: ["orders", pageParam],
    queryFn: () => getAllOrders({ id, pageParam, token: session?.user?.access_token }),
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
