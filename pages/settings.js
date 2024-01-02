import Nav from '@components/dashboard/navbar'
import Layout from '@layouts/protected'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import querygen from '@querygen'
import { UserContext } from '@components/userContext'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { uploadData } from 'aws-amplify/storage';
import { getUrl } from 'aws-amplify/storage';

export default function Settings() {

    const [pfp, setPfp] = useState(null)

    const getUrlResult = async (key) => {
    const r = await getUrl({
        key: key,
        options: {
          accessLevel: 'public' , // can be 'private', 'protected', or 'guest' but defaults to `guest`
          validateObjectExistence: false,  // defaults to false
          expiresIn: 900 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
        },
      });
      setPfp(r.url.toString())
      if(r.url) return r.url.toString();
      else return null;
    }

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
            getUrlResult(data.getUser?.pfp)
        }
        if(error) {
            toast.error(error)
        }
    }, [data])

    const [updateUser, { data: d, loading: l, error: e }] = useMutation(querygen("updateUser_MO"));

    const handleSave = () => {
        // Ensure all variables are defined
        if (userData.sub && name || business_name || business_url || subdomain) {
            let variables = { email: userData.email };
            if (name !== null && name !== undefined && name !== '') variables.name = name;
            if (business_name !== null && business_name !== undefined && business_name !== '') variables.business_name = business_name;
            if (business_url !== null && business_url !== undefined && business_url !== '') variables.business_url = business_url;
            if (subdomain !== null && subdomain !== undefined && subdomain !== '') variables.subdomain = subdomain;

            updateUser({ variables: { input: variables } })
            .then(response => {
                toast.success("Saved!");    
            })
            .catch(err => {
                toast.error(err.message);
            });
        } else {
            toast.error("All fields must be filled out");
        }
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
            <div className="relative flex justify-center items-end">
    <img
      className="w-20 h-20 p-3 rounded-full ring-2 ring-gray-800 dark:ring-gray-800"
      src={pfp || "https://img.icons8.com/color/48/user-male-circle--v1.png"}
      alt="image description"
    />
    <input type="file" id="file" style={{display: 'none'}} onChange={async ()=>{
    try {
        //Upload image to s3 and update pfp
        const fileInput = document.getElementById("file");
        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const extension = file.name.split('.').pop();
            const result = await uploadData({
                key: "profile/"+userData.sub+"."+extension, 
                data: fileInput.files[0], 
                options: {
                    accessLevel: 'public'
                }
            }).result;
            console.log(result);
            toast.success("Profile picture updated!")
            await updateUser({ variables: { input: { email: userData.email, pfp: result.key } } });
            toast.success("Saved!");
            getUrlResult(result.key);
        } else {
            toast.error("No file selected");
        }
    } catch (err) {
        toast.error(err.message);
    }
}}/>
<a href="#" className="absolute bottom-0 mb-1 h-6 w-6" onClick={(e)=>{
    e.preventDefault();
    document.getElementById("file").click();
}}>
    <img
      className="absolute bottom-0 mb-1 h-6 w-6"
      src="https://img.icons8.com/pulsar-line/48/camera.png"
      alt="camera icon"
    />
    </a>
  </div>
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