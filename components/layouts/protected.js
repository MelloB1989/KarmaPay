import { UserContext } from '@components/userContext';
import { useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import Preloader from '@components/preloader';
//import { getCurrentUser } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';
//import { fetchAuthSession } from 'aws-amplify/auth';

export default function ProtectedPage( { children } ){
    const { userData, setUserData } = useContext(UserContext);
    useEffect(()=>{
        const get_session = async() => {
            try {
                //const { username, userId, signInDetails } = await getCurrentUser();
                //const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
                //console.log(accessToken, idToken)
                const userAttributes = await fetchUserAttributes();
                setUserData(userAttributes);
                console.log(userAttributes)
            } catch (err) {
                console.log(err);
                window.location.href = "/login";
            }
        }
        get_session();
    }, []);

    return(
        <>
         { userData ? (<div>{children}</div>) : (<Preloader/>)}
        </>
        )
}