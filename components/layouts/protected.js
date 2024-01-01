import { UserContext } from '@components/userContext';
import { useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import Preloader from '@components/preloader';
//import { getCurrentUser } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';
import axios from 'axios';
//import { fetchAuthSession } from 'aws-amplify/auth';

export default function ProtectedPage( { children } ){

    function getCookie() {
        const r = document.cookie.replace(
            /(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
          );
        if(r) return r;
        else return false;
      }

    const { userData, setUserData } = useContext(UserContext);
    useEffect(()=>{
        const get_session = async() => {
            try {
                //const { username, userId, signInDetails } = await getCurrentUser();
                //const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
                //console.log(accessToken, idToken)
                const userAttributes = await fetchUserAttributes();
                setUserData(userAttributes);
                console.log(getCookie());
                if(!getCookie()) {
                    await axios.post('/api/get_jwt', {
                        email: userAttributes.email,
                        uid: userAttributes.sub,
                    });
                }
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