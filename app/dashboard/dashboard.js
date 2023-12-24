"use client"
import Orders from './orders'

export default function Dash(){
    return(
        <>
           <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 pl-2">
  <div className="flex flex-col md:flex-row gap-4">
    
    {/* Orders Component occupying the left part */}
    <div className="flex-1">
      <Orders/>
    </div>

    {/* Cards on the right side */}
    <div className="flex flex-col gap-4">
      {/* Card 1 */}
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Total Revenue
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Your total revenue across all payment gateways crossed <span className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $2367
          </span>
      </p>
    </div>

      {/* Card 2 */}
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Average Daily Transactions
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Your average daily transactions across all payment gateways crossed <span className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            190+
          </span>
      </p>
    </div>
    </div>

  </div>
</div>
        </main>
        </>
        )
}