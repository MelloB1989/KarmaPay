import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config();

const client = createClient ({
  url : process.env.REDIS_ENDPOINT //|| env.REDIS_ENDPOINT,
});

client.on("error", function(err) {
    throw err;
  });

export default function Order() {

    const [orderDetails, setOrder] = useState({});
    const router = useRouter();
    const { order_id } = router.query;

    useEffect(()=>{
        if(order_id){
            const get_order = async () => {
                await client.connect();
                const order = await client.get(order_id);
                console.log(order);
                setOrder(JSON.parse(order));
                client.disconnect();
            }
            get_order();
        }
    }, [router.query]);

    return(
        <>
        
        </>
    )
}