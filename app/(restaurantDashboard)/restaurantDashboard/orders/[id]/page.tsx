"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const OrderDetailsPage = () => {
    const searchParams = useSearchParams();
    const orderString = searchParams.get("order");

    if (!orderString) return <div>No order details found.</div>;

    const order = JSON.parse(orderString);

    return (
        <div className="px-6">
            <h2 className="text-xl font-bold mb-4">Order #{order.id}</h2>
                <div className="flex gap-2 flex-col">
                <p className="mb-2"><strong>Customer:</strong> {order.user.firstName} {order.user.lastName}</p>
                <p className="mb-2"><strong>Restaurant:</strong> {order.restaurant.name}</p>
                <p className="mb-2"><strong>Status:</strong> {order.orderStatus}</p>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                    <tr className="text-left text-sm text-gray-500">
                        <th className="px-4 py-4">Food</th>
                        <th className="px-4 py-4">Price</th>
                        <th className="px-4 py-4">Quantity</th>
                        <th className="px-4 py-4">Total</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {order.orderDetails.map((item: any) => (
                        <tr key={item.id}>
                            <td className="px-4 py-4 flex items-center gap-2">
                                {item.image ? (
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                        <Image src={item.image} alt={item.foodName} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                        <Image src={"/assets/img-placeholder.png"} alt={item.foodName} fill className="object-cover" />
                                    </div>
                                )}
                                {item.foodName}
                            </td>
                            <td className="px-4 py-4">${item.price}</td>
                            <td className="px-4 py-4">{item.quantity}</td>
                            <td className="px-4 py-4">${item.totalPrice}</td>
                        </tr>
                    ))}
                    <tr className="bg-gray-50">
                        <td className="px-4 py-4">Total:</td> 
                        <td className="px-4 py-4"></td> 
                        <td className="px-4 py-4">{order.orderDetails.reduce((total: number, item: any) => total + item.quantity, 0)}</td>
                        <td className="px-4 py-4">${order.totalPrice ? order.totalPrice : order.orderDetails.reduce((total: number, item: any) => total + item.totalPrice, 0)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetailsPage;
