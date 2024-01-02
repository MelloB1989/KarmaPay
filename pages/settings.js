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
import { uuid } from 'uuidv4'
import axios from 'axios'

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
    const [apiKeys, setAPIKeys] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [kp, setKP] = useState(null)
    const [rapi, setrapi] = useState({
        key: null,
        secret: null,
        id: null
    })

    //const {data: da, loading: la, error: ea} = useQuery(querygen("listAPIKeys", { uid: userData?.sub }))
    const [updateAPIKeys, {data: ud, loading: ul, error: ue}] = useMutation(querygen("updateAPIKey_MO"))
    const [createAPI, {data: cda, loading: cla, error: cea}] = useMutation(querygen("createAPIKey_MO"))

    const { loading: la, error: ea, data: da } = useQuery(querygen("listAPIKeys_QO"), {
        variables: { filter: { uid: { eq: userData?.sub } } },
        onCompleted: (data) => {
            setAPIKeys(data.listUserAPIKeys.items);
            setrapi({ ...rapi, id: (data.listUserAPIKeys.items.map((key)=> {if(key.pgEnum === "RAZORPAY") return key.id}).filter((key)=>{if(key !== undefined) return key}))[0] })
            if (data.listUserAPIKeys.items.length === 0) {
                toast.info("Creating API Keys...");
                createAPI({
                    variables: {
                        input: { uid: userData?.sub, pgEnum: "RAZORPAY", apiKey: "", id: uuid() },
                    },
                })
                createAPI({ variables: { input: { uid: userData?.sub, pgEnum: "STRIPE", apiKey: "", id: uuid() } } })
                createAPI({ variables: { input: { uid: userData?.sub, pgEnum: "PHONEPE", apiKey: "", id: uuid() } } })
                createAPI({ variables: { input: { uid: userData?.sub, pgEnum: "KP", apiKey: "", id: uuid() } } })
                .then(response => {
                    toast.success("Saved!");    
                })
                window.location.reload();
            }
        },
    });

    useEffect(() => {
        if(data) {
            setData(data.getUser)
            getUrlResult(data.getUser?.pfp)
        }
        if(error) {
            toast.error(error)
        }
    }, [data, da, la])

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
            <div
    id="popup-modal"
    tabIndex={-1}
    className={`${showModal ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
  >
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
          onClick={() => setShowModal(false)}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
        <img width="96" height="96" className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" src="https://img.icons8.com/color/96/checked--v1.png" alt="checked--v1"/>
        <h2>Your API has been generated</h2>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {kp}
          </h3>
          <p>Please keep it safe, API keys can be viewed only once</p>
          <br/>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={() => { navigator.clipboard.writeText(kp); toast.success("Copied!")}}
          >
            Copy API
          </button>
        </div>
      </div>
    </div>
  </div>
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
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-300">
                Your API Keys
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
              <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    KarmaPay API Key
                </label>
                <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="We do not save KP API Key"
                    disabled
                />
                <button 
                      className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                      onClick={async() => {
                        const r = await axios.post("/api/create_api_key", { email: userData.email, uid: userData.sub, expiry: "7d" })
                        setKP(r.data.prefixedToken)
                        toast.success("API Key generated!")
                        setShowModal(true)
                      }}
                    >
                      Generate new KP API Key
                </button>
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    RazorPay API Key
                </label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Set API Key"
                    onChange={(e) => setrapi({ ...rapi, key: e.target.value })}
                />
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Set API Secret"
                    onChange={(e) => setrapi({ ...rapi, secret: e.target.value })}
                />
                </div>
              </dl>
              <div className="flex justify-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <button type="button" onClick={()=>{
                    updateAPIKeys({ variables: { input: { id: rapi.id, apiKey: `kp_${Buffer.from(JSON.stringify(rapi)).toString('base64')}`, pgEnum: "RAZORPAY", uid: userData.sub } } })
                    .then(response => {
                        toast.success("Saved!");    
                    })
                    .catch(err => {
                        toast.error(err.message);
                    });
                }}>
                    Save
                </button>
            </div>
            </div>
          </div>
        </div>
        </Layout>
    )
}