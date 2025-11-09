"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import { useGetRestaurantOrders } from "@/hooks/orderQueries";
import { useSession } from "next-auth/react";
import { useGetRestaurantUser } from "@/hooks/restaurantsQueries";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "@/apicalls/order";

const OrdersTable = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data: restaurantData } = useGetRestaurantUser(
    Number(session?.user?.id),
    session?.user?.access_token
  );

  const { data: orderData, isPending } = useGetRestaurantOrders(
    Number(restaurantData?.restaurantId),
    page
  );

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");

  const prevPage = () => setPage(page - 1);
  const nextPage = () => setPage(page + 1);
  const pagesArray = Array.from({ length: orderData?.totalPages ?? 1 }, (_, i) => i + 1);

  const handleClick = (order: any) => {
    router.push(`/restaurantDashboard/orders/${order.id}?order=${encodeURIComponent(JSON.stringify(order))}`);
  };

  const openEditDialog = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setIsEditOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedOrder(null);
    setIsEditOpen(false);
  };

  const updateOrderStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      closeEditDialog();
      queryClient.invalidateQueries({queryKey:['restaurant-orders', page, restaurantData?.restaurantId]})
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;
    try {
      updateOrderStatusMutation.mutate({
        orderId: selectedOrder.id,
        body: { orderStatus: newStatus },
        token: session?.user?.access_token,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const statusOptions = [
    "Pending",
    "Fulfilled",
    "Unfulfilled",
    "In Delivery",
    "Cancelled",
  ];

  return (
    <>
      <h1 className="font-semibold text-3xl opacity-80">Orders</h1>
      <div className="w-full overflow-x-auto border rounded-lg bg-gray-50/30 mb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-sm text-gray-500">
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Total Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white/80 divide-y divide-gray-100">
            {orderData?.content?.map((order: any) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                onClick={() => handleClick(order)}
              >
                <td className="px-4 py-3 text-sm text-gray-700">{order.id}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {order.user?.firstName} {order.user?.lastName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">${order.totalPrice}</td>
                <td className="px-4 py-3 text-sm text-gray-700 capitalize">{order.orderStatus}</td>
                <td className="px-4 py-3 text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditDialog(order);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-5 flex justify-end gap-2 p-4">
          <Button onClick={prevPage} disabled={page === 1}>Prev</Button>
          <Pagination
            pages={pagesArray.length}
            currentPage={page}
            onPageChange={(pg) => setPage(pg)}
            pending={isPending}
          />
          <Button onClick={nextPage} disabled={page === orderData?.totalPages}>Next</Button>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label>Order ID</Label>
              <p className="text-sm text-gray-600">{selectedOrder?.id}</p>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={closeEditDialog}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersTable;
