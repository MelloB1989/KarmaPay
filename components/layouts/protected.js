import { UserContext } from '@components/userContext';
import { useEffect, useContext } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

export default function ProtectedPage( { children } ){
    const { userData, setUserData } = useContext(UserContext);
    useEffect(()=>{
        const get_session = async() => {
            try {
                const { username, userId, signInDetails } = await getCurrentUser();
                console.log(`The username: ${username}`);
                console.log(`The userId: ${userId}`);
                console.log(`The signInDetails: ${signInDetails}`);
                setUserData(username);
            } catch (err) {
                console.log(err);
            }
        }
        get_session();
    }, [userData]);
    console.log(userData)
    return(
        <>
         { userData ? (<div>{children}</div>) : (<p></p>)}
        </>
        )
}