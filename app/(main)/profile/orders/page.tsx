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

  return (
    <section className="mt-20 mx-[20px] md:mx-[40px] 2xl:mx-[80px] max-md:flex-wrap flex flex-col gap-y-10 justify-center items-center mb-20">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 w-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full">
            <Receipt className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
            
          </div>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"></div>
      </div>

      {orders?.content?.length ? (
        <ul className="w-full space-y-6">
          {orders?.content?.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2"></div>

              <li className="p-8">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full">
                      <ShoppingBag className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">
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
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.orderStatus === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : order.orderStatus === "PENDING"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-600">Rs. {order.totalPrice}</p>
                      <p className="text-sm text-gray-500">Total Amount</p>
                    </div>
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                  <Store className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-gray-700">{order.restaurant?.name}</span>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700 mb-3">Order Items:</h4>
                  <ul className="space-y-2">
                    {order.orderDetails?.map((detail) => (
                      <li
                        key={detail.id}
                        className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <span className="font-medium text-gray-800">{detail.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">Qty: {detail.quantity}</span>
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
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-12 w-full text-center">
          <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
            <Receipt className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders found</h3>
          <p className="text-gray-500">You haven't placed any orders yet. Start exploring restaurants!</p>
        </div>
      )}
    </section>
  )
}

export default OrdersPage
