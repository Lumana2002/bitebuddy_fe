"use client"

import Loading from "@/components/Loading"
import { useGetAllOrders } from "@/hooks/orderQueries"
import { useSession } from "next-auth/react"
import { Clock, Receipt, ShoppingBag, Store } from "lucide-react"

const OrdersPage = () => {
  const { data: session } = useSession()
  const { data: orders, isPending: isLoading } = useGetAllOrders(session?.user?.id, 1)
  console.log(orders)

  // const formatOrderDate = (dateString: string) => {
  //   const options = { weekday: 'long', year: 'numeric', month: 'short', day: '2-digit' };
  //   const date = new Date(dateString);

  //   // Format the date to "Friday, Oct 18, 07:59 AM"
  //   const formattedDate = `${date.toLocaleDateString('en-US', options)}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

  //   return formattedDate;
  // }

  if (isLoading) {
    return <Loading />
  }

  // Debug: Log order details to console
  console.log('Order details:', orders?.content?.map(order => ({
    id: order.id,
    orderDetails: order.orderDetails
  })));

  return (
    <section className="mt-20 mb-20 px-4 md:px-10 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8 mt-6">
        <div className="mt-10 mb-8 flex flex-col items-center text-center">
          <div className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2 mb-1">
            <Receipt className="w-5 h-5 text-amber-600" />
            Order History
          </div>
          <p className="text-gray-500 text-sm">View your recent orders</p>

        </div>
      </div>

      {orders?.content?.length ? (
        <ul className="space-y-5">
          {orders?.content?.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">

              <li className="p-8">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <div className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-amber-600" />
                      Order #{order.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <Clock className="w-4 h-4 text-amber-500" />

                        {order?.orderDate &&
                          new Date(order.orderDate).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}

                      </div>
                    </div>
                  </div>

                  <div className="mt-3 md:mt-0 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${order.orderStatus === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {order.orderStatus}
                    </span>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-amber-600 mt-1">Rs. {order.totalPrice}</p>
                      <p className="text-sm text-gray-500">Total Amount</p>
                    </div>
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="flex items-center gap-2 text-gray-700 text-sm mb-4">
                  <Store className="w-4 h-4 text-amber-500" />
                  {order.restaurant?.name}
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <ul className="divide-y divide-gray-100">
                    {order.orderDetails?.map((detail) => (
                      <li
                        key={detail.id}
                        className="flex justify-between py-2 text-sm"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="font-medium text-gray-800">
                            {detail.foodName || 'Unnamed Item'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          {detail.quantity && detail.quantity > 1 && (
                            <span className="text-sm text-gray-600 whitespace-nowrap">
                              {detail.quantity} × Rs. {detail.price?.toFixed(2) || '0.00'}
                            </span>
                          )}
                          <span className="font-medium text-amber-700 whitespace-nowrap">
                            Rs. {(detail.quantity * (detail.price || 0)).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <div className="text-center bg-white rounded-xl border border-gray-100 p-10">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
            <Receipt className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No orders yet</h3>
          <p className="text-gray-500 text-sm">You haven't placed any orders. Explore restaurants to get started!</p>
        </div>
      )}
    </section>
  )
}

export default OrdersPage
