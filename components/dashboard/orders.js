import querygen from '@querygen'
import { useQuery } from '@apollo/client'
import { UserContext } from '@components/userContext';
import { useEffect, useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function Orders() {

  const { userData } = useContext(UserContext);
  const [orders, setOrders] = useState([])

  const { data, loading, error } = useQuery(querygen("listOrders", { uid: userData.sub }))
  useEffect(()=>{ 
    if(data) {
      setOrders(data.listOrders.items)
    }
    if(error) {
      toast.error(error)
    }
  }, [data])

  return (
    loading ? (
<div
  role="status"
  className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
>
  <div className="flex items-center justify-between">
    <div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
    </div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
  </div>
  <div className="flex items-center justify-between pt-4">
    <div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
    </div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
  </div>
  <div className="flex items-center justify-between pt-4">
    <div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
    </div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
  </div>
  <div className="flex items-center justify-between pt-4">
    <div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
    </div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
  </div>
  <div className="flex items-center justify-between pt-4">
    <div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
    </div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
  </div>
  <span className="sr-only">Loading...</span>
</div>
    ) : (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
  <div className="flex items-center justify-between mb-4">
    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
      Latest Orders
    </h5>
    <a
      href="#"
      className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
    >
      View all
    </a>
  </div>
  <div className="flow-root">
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
      {
        orders.length>1 ? orders.map((order)=>{
          return (
            <li className="py-3 sm:py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={order.orderStatus === "PENDING" ? "https://img.icons8.com/color/96/clock--v1.png" : "https://img.icons8.com/color/96/ok--v1.png"}
              alt="status"
            />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {order.orderID}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {order.orderTimestamp}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {order.orderAmt}
          </div>
        </div>
      </li>
          )
        }) : (
          <p>No orders yet</p>
        )
      }
    </ul>
  </div>
</div>
    ))
}
