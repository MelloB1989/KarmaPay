"use client"
import { logo_url } from '@config'
import { signUp } from 'aws-amplify/auth'
import { confirmSignUp } from 'aws-amplify/auth'
import { autoSignIn } from 'aws-amplify/auth';
import { useState} from 'react'
import { toast } from 'react-toastify'

import { Amplify } from 'aws-amplify';
import awsExports from '@/src/aws-exports';
Amplify.configure({ ...awsExports, ssr: true });

export default function Login(){
  
  const [username, setUsern] = useState()
  const [password, setPass] = useState()
  const [email, setE] = useState()
  const [phone_number, setPh] = useState()
  const [name, setName] = useState()
  const [otp, setOTP] = useState()
  const [confirm, setConfirm] = useState(false)
  
  const handleSignup = async(e) => {
    e.preventDefault()
    try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          name,
          preferred_username: username,
          email,
          phone_number: `+${phone_number}` // E.164 number convention
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });

    if(nextStep.signUpStep === 'CONFIRM_SIGN_UP'){
      setConfirm(true)
      toast.success(`OTP sent to your ${nextStep.codeDeliveryDetails.deliveryMedium}. Please check your spam folder.`)
    }
    if(isSignUpComplete) toast.success("Sign up successful!")
  } catch (error) {
    console.log('error signing up:', error);
    toast.error(error)
  }
  }
  
  const handleConfirm = async(e) => {
    e.preventDefault()
    try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: otp
    })

    if(isSignUpComplete) toast.success("Sign up successful!")
    if(nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN"){
      await autoSignIn()
      //Redirect to dashboard
      window.location.href = '/dashboard'
    }
  } catch (error) {
    console.log('error confirming sign up', error);
  }
  }
  
    return(
      <>
      { confirm ? (
        <>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a
      href="/"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-8 h-8 mr-2"
        src={logo_url}
        alt="logo"
      />
      KarmaPay
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Confirm your OTP
        </h1>
        <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => handleConfirm(e)}>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              OTP
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={(e) => handleConfirm(e)}
          >
            Confirm
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Have an account yet?{" "}
            <a
              href="/auth"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
        </>
        ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a
      href="/"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-8 h-8 mr-2"
        src={logo_url}
        alt="logo"
      />
      KarmaPay
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign up to a new account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => handleSignup(e)}>
        <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="mellob1989"
              required={true}
              onChange={(e) => setUsern(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="7777777777"
              required={true}
              onChange={(e) => setPh(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required={true}
              onChange={(e) => setE(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={(e) => handleSignup(e)}
          >
            Sign up
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Have an account yet?{" "}
            <a
              href="/auth"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
)}
</>
        )
}