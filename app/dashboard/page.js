/*import { getCurrentUser } from 'aws-amplify/auth'
import { fetchUserAttributes } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';

async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    console.log(userAttributes);
  } catch (error) {
    console.log(error);
  }
}

import { getCurrentUser } from 'aws-amplify/auth';

async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
  } catch (err) {
    console.log(err);
  }
}

import { fetchAuthSession } from 'aws-amplify/auth';

async function currentSession() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
  } catch (err) {
    console.log(err);
  }
}
*/
import Navbar from './navbar'
import Dash from './dashboard'

export default async function Dashboard({ user }){
    return(
<>
 <div className="min-h-full bg-white">
 <Navbar/>
<Dash/>
        </div>
</>
        )
}