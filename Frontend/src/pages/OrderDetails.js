import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.orderDetails.url, {
        method: SummaryApi.orderDetails.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();
      console.log(result)
      setOrders(result?.data || []);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <FaCheckCircle className="text-green-600 inline-block mr-1" />;
      case 'failed':
        return <FaTimesCircle className="text-red-600 inline-block mr-1" />;
      default:
        return <FaClock className="text-yellow-500 inline-block mr-1" />;
    }
  };

  return (
      <div className=" w-full p-4">
        <h2 className="text-3xl font-bold mb-6">Order List</h2>

        {loading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-full mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-5/6 mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-2/3 mb-4"></div>
            </div>
        ) : orders.length === 0 ? (
            <p>No orders found.</p>
        ) : (
            <div className="overflow-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
                <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">User </th>
                  <th className="p-3 border">Phone</th>
                  <th className="p-3 border">Address</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Total</th>
                  <th className="p-3 border">Ordered On</th>
                  <th className="p-3 border">Items</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, idx) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="p-3 border">{idx + 1}</td>
                      <td className="p-3 border">{order._id}</td>
                      <td className="p-3 border">{order.userId.name}</td>
                      <td className="p-3 border">{order.phoneNumber}</td>
                      <td className="p-3 border">{order.address}</td>
                      <td className="p-3 border">
                    <span className="flex items-center">
                      {getPaymentStatusIcon(order.paymentStatus)}
                      {order.paymentStatus}
                    </span>
                      </td>
                      <td className="p-3 border">{displayINRCurrency(order.totalPrice)}</td>
                      <td className="p-3 border">{new Date(order.createdAt).toLocaleString()}</td>
                      <td className="p-3 border">
                        <ul className="space-y-1">
                          {order.orderItems.map((item, i) => (
                              <li key={i} className="text-sm">
                                <span className="font-semibold">{item.itemType}</span> (Qty: {item.quantity})
                              </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
};

export default OrderDetails;
