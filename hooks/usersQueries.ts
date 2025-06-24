import { getAllUsers, getUserDetails } from "@/apicalls/users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllUsers = (
  pageParam: number | undefined,
  token: string | undefined
) => {
  const { data, isPending } = useQuery<PaginatedUsersData>({
    queryKey: ["users", pageParam],
    queryFn: () => getAllUsers(pageParam, token),
    placeholderData: keepPreviousData,
  });
  return { data, isPending };
};

export const useGetUserDetails = (id: number, token: string | undefined) => {
  const { data, isPending } = useQuery<UserDetails>({
    queryKey: ["users", id],
    queryFn: () => getUserDetails(id, token),
  });

  return { data, isPending };
};

