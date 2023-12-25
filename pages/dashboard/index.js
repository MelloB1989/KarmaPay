import Layout from '@layouts/protected'
import Navbar from '@components/dashboard/navbar'
import Dash from '@components/dashboard/dashboard'

export default function Dashboard(){
    return(
<Layout>
 <div className="min-h-full bg-white">
 <Navbar/>
<Dash/>
        </div>
</Layout>
        )
}