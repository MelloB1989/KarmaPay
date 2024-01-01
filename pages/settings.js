import Nav from '@components/dashboard/navbar'
import Layout from '@layouts/protected'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import querygen from '@querygen'
import { UserContext } from '@components/userContext'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Settings() {

    const { userData } = useContext(UserContext)
    const [udata, setData] = useState({})
    const { data, loading, error } = useQuery(querygen("getUser", { email: userData?.email }))
    const [name, setName] = useState(null)
    const [business_name, setBusinessName] = useState(null)
    const [business_url, setBusinessURL] = useState(null)
    const [subdomain, setSubdomain] = useState(null)

    useEffect(() => {
        if(data) {
            setData(data.getUser)
        }
        if(error) {
            toast.error(error)
        }
    }, [data])

    const [updateUser, { data: d, loading: l, error: e }] = useMutation(querygen("updateUser_MO"));

    const handleSave = () => {
        updateUser({ variables: { uid: userData.sub, name, business_name, business_url, subdomain }})
        .then(response => {
            toast.success("Saved!");
            
        })
        .catch(err => {
            toast.error(err.message);
        });
    }

    return (
        <Layout>
            <Nav/>
        <header className="bg-gray-900 shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Settings</h1>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-300">
                Your details
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
              <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your name
                </label>
                <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userData?.name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Business Name
                </label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={udata?.business_name ? udata?.business_name : "Not set"}
                    onChange={(e) => setBusinessName(e.target.value)}
                />
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Business URL
                </label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={udata?.business_url ? udata?.business_url : "Not set"}
                    onChange={(e) => setBusinessURL(e.target.value)}
                />
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Subdomain
                </label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={udata?.subdomain ? udata?.subdomain : "Not set"}
                    onChange={(e) => setSubdomain(e.target.value)}
                />
                </div>
              </dl>
              <div className="flex justify-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <button type="button" onClick={handleSave}>
                    Save
                </button>
            </div>
            </div>
          </div>
        </div>
        </Layout>
    )
}