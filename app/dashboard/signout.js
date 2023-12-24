"use client"
import { signOut } from 'aws-amplify/auth'
import { toast } from 'react-toastify'

import { Amplify } from 'aws-amplify';
import awsExports from '@/src/aws-exports';
Amplify.configure({ ...awsExports, ssr: true });

export default function handleSignOut({ mode }) {
  
  const handleSignOut = async () => {
  try {
    await signOut({ global: true })
    window.location.href = "/"
    toast.success('Signed out')
  } catch (error) {
    console.log('error signing out: ', error)
    toast.error(error)
  }
  }
  
  return(
      <>
{ mode === "mobile" ? (
<a href="#signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" onClick={()=>{
    handleSignOut()
}}>
    Sign out
</a>
) : (
    <span className="flex-1 ms-3 whitespace-nowrap" onClick={()=>{
        handleSignOut()
    }}>Sign Out</span>
    )}
</>
      )
}