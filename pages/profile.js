import Nav from '@components/dashboard/navbar'
import Layout from '@layouts/protected'
import { useQuery } from '@apollo/client'
import querygen from '@querygen'
import { UserContext } from '@components/userContext'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '@/components/loaders/list_load'

export default function Profile() {
    const { userData } = useContext(UserContext)
    const [udata, setData] = useState({})
    const [apiKeys, setAPIKeys] = useState([])
    const { data, loading, error } = useQuery(querygen("getUser", { email: userData?.email }))
    const {data: d, loading: l, error: e} = useQuery(querygen("listAPIKeys", { uid: userData?.sub }))

    useEffect(() => {
        if(d) {
            setAPIKeys(d.listUserAPIKeys.items)
        }
        if(e) {
            toast.error(e)
        }
        if(data) {
            setData(data.getUser)
        }
        if(error) {
            toast.error(error)
        }
    }, [data, d])

    return (
        <Layout>
        <Nav />
        <header className="bg-gray-900 shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Your profile</h1>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-300">
                Your details
              </h3>
            </div>
            {loading ? (<Loader />) : (
            <div className="border-t border-gray-200">
              <dl>
              <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-100">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                    {userData?.name}
                  </dd>
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-100">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                    {userData?.email}
                  </dd>
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-100">
                    Business Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                    {udata?.business_name ? udata?.business_name : "Not set"}
                  </dd>
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-100">
                    Business URL
                  </dt>
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                    {udata?.business_url ? udata?.business_url : "Not set"}
                  </dd>
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-100">
                    Subdomain
                  </dt>
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                    {udata?.subdomain ? udata?.subdomain : "Not set"}
                  </dd>
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-100">
                    Subdomain Status
                  </dt>
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                    {udata?.subdomain_status ? udata?.subdomain_status : "Not set"}
                  </dd>
                </div>
              </dl>
            </div>
            )}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-300">
                Your API Keys
              </h3>
            </div>
            {l ? (<Loader />) : (
            <div className="border-t border-gray-200">
              <dl>
                {apiKeys.length > 0 ? apiKeys.map((key) => (
              <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-100">
                    {key.pgEnum}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2 flex justify-between items-center">
                    {key.apiKey}
                    <button 
                      className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => { navigator.clipboard.writeText(key.apiKey); toast.success("Copied!")}}
                    >
                      <img width="10" height="10" src="https://img.icons8.com/office/40/copy.png" alt="copy"/>
                    </button>
                  </dd>
                </div>
                )):(
                  <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-100">
                    No API Keys
                  </dt>
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2 flex justify-between items-center">
                    You have no API Keys
                  </dd>
                  </div>
                )}
              </dl>
            </div>
            )}
          </div>
        </div>
        </Layout>
    )
}
//https://img.icons8.com/color/48/user-male-circle--v1.png