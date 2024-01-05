import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config();
import Register from './register';
import { ToastContainer } from "react-toastify";
import createRazorpayOrder from '@/lib/razorpay/create_order';
import 'react-toastify/dist/ReactToastify.css';

const client = createClient ({
  url : process.env.REDIS_ENDPOINT //|| env.REDIS_ENDPOINT,
});

client.on("error", function(err) {
    throw err;
});

export default async function Order({ params }) {

    let orderDetails = {};
    let PGorder = {};
    let makeC = false;
    const { order_id } = params;

    client.connect();
    orderDetails = await client.get(order_id);
    //parse the orderDetails
    orderDetails = JSON.parse(orderDetails);
    if (!orderDetails) {
      throw new Error(`No order found with id: ${order_id}`);
    }
    
    const { api_key, kpapi, uid } = orderDetails;
    let PGapi = Buffer.from(api_key.substring(3), 'base64').toString('ascii');
    PGapi = JSON.parse(PGapi);
    //await client.disconnect();

    if(orderDetails.order_status === "PENDING"){
      switch (orderDetails.order_mode) {
        case "RAZORPAY":
          //Create a Razorpay order
          const razorpayOrder = await createRazorpayOrder(PGapi.key, PGapi.secret, orderDetails.order_amt, orderDetails.order_id, orderDetails.order_description);
          PGorder = razorpayOrder;
          //Update the Redis order
          orderDetails.PGorder = razorpayOrder;
          orderDetails.order_status = "CREATED";
          await client.set(order_id, JSON.stringify(orderDetails));
        break;
      
        default:
          console.log("Invalid order mode");
          break;
      }
    }
    else{
      PGorder = orderDetails.PGorder;
    }
    if(!orderDetails.order_cid === "")
      makeC = true;

    return(
      <>
        <Register uid={uid} kpapi={kpapi} order_details={orderDetails} order_id={order_id} makeC={makeC} RZkey={PGapi.key} />
        <ToastContainer />
      </>
    )
}