"use client"
import { logo_url } from '@/config'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from 'axios';

export default function Register({ uid, kpapi, order_details, order_id, makeC, RZkey }){

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [terms, setTerms] = useState(false);
    const [makec, setMakeC] = useState(makeC ? "make" : "");
    //makeC ---> Register customer
    const [payStatus, setPayStatus] = useState(false);

    function loadScript(src) {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    }

    const verify_payment = async (order, pay, sig) => {
      const res = await axios.post("https://zany-space-umbrella-gpjxp5w67wcwqrj-3000.app.github.dev/api/v1/payment/verify", {
        order_id: order,
        payment_id: pay,
        signature: sig,
        RZKey: RZkey
      }, {
        headers: {
          "Authorization": "Bearer "+kpapi
        }
      });
      if(res.status === 200){
        if(res.data.data.status === "success"){
          setPayStatus(true);
          toast.success("Payment successful");
        }
        else{
          setPayStatus(false);
          toast.error("Payment failed");
        }
        setMakeC("result");
      }
      else{
        toast.error("Could not verify payment");
      }
    }

    const invoke_payment = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
  
      if (!res) {
        toast.error("Could not speak to my server. Are you online?");
        return;
      }
      else{
        const options = {
        key: RZkey,
        currency: order_details.order_currency,
        //amount: course_price+"00",
        amount: order_details.order_amt+"00",
        order_id: order_details.PGorder.id,
        name: "KarmaPay Payments",
        description: "Avidia Labs",
        image: logo_url,
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          //setPayment(response.razorpay_payment_id);
          //setOrder(response.razorpay_order_id);
          const sig = response.razorpay_signature;
          const pay = response.razorpay_payment_id;
          //console.log("RESPONSE"+sig);
          verify_payment(order_details.PGorder.id, pay, sig);
        },
        theme: {
      color: "#0d4aba",
    },
        prefill: {
          name: fname + lname,
          email: email,
          phone_number: phone,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      }
    }

    const handleCRegister = async (e) => {
      if(!last_name || !first_name || !email || !phone)
        toast.error("Please fill all the details");
      e.preventDefault();
      if(!terms) toast.error("Please agree to the terms and conditions");
      else{
        const id = toast.loading("Registering customer...");
        const res = await axios.post("https://karmapay.live/api/v1/customer/register", {
          first_name: fname,
          last_name: lname,
          email: email,
          phone: phone,
          uid: uid
        }, {
          headers: {
            "Authorization": "Bearer "+kpapi
          }
        });
        if(res.status === 200){
          toast.update(id, { render: "Customer registered successfully", type: "success", isLoading: false, autoClose: 2000 });
          setMakeC(true);
          invoke_payment();
          toast.success("Customer registered successfully");
        }
        else{
          toast.update(id, { render: res.data.error, type: "error", isLoading: false, autoClose: 2000 });
          toast.error("Could not register customer");
        }
      }
    }

    return(
      makec === "" ? (
        <>
        <div>
          <div className="flex items-center justify-center min-h-screen pt-8 pb-8">
          <div
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
                <a
      href="/"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <h1>KarmaPay payments</h1><br/>&nbsp;
      
      </a>
      <button
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onClick={(e) => invoke_payment()}
  >
    Proceed to payment
  </button>
      </div>
          </div>
        </div>
        </>
      ) : makec === "result" ? (
        <>
        <div>
          <div className="flex items-center justify-center min-h-screen pt-8 pb-8">
          <div
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
                <a
      href="/"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
            <h1>{payStatus ? "Payment Successful" : "Payment Failed"}</h1><br/>&nbsp;
            </a>
            <p><strong>Powered by KarmaPay</strong></p>
            </div>
          </div>
        </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen pt-8 pb-8">
            <div
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
                <a
      href="/"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-12 h-12 mr-2"
        src={logo_url}
        alt="logo"
      />
      KarmaPay
    </a>
                <form action={(e) => handleCRegister(e)}>
                <h3 className="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-md dark:text-white">
          Please fill the details to continue your payment
        </h3>
  <div className="pt-4 grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        First name
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="John"
        onChange={(e) => setFName(e.target.value)}
        required=""
      />
    </div>
    <div>
      <label
        htmlFor="last_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Last name
      </label>
      <input
        type="text"
        id="last_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Doe"
        onChange={(e) => setLName(e.target.value)}
        required=""
      />
    </div>
  </div>
  <div>
      <label
        htmlFor="phone"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Phone number
      </label>
      <input
        type="tel"
        id="phone"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="123-45-678"
        pattern="[0-9]{10}"
        onChange={(e) => setPhone(e.target.value)}
        required=""
      />
    </div>
  <div className="mb-6">
    <label
      htmlFor="email"
      className="pt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Email address
    </label>
    <input
      type="email"
      id="email"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="john.doe@company.com"
      onChange={(e) => setEmail(e.target.value)}
      required=""
    />
  </div>
  <div className="flex items-start mb-6">
    <div className="flex items-center h-5">
      <input
        id="remember"
        type="checkbox"
        value={terms}
        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
        required=""
        onChange={(e) => e.target.checked ? setTerms(true) : setTerms(false)}
      />
    </div>
    <label
      htmlFor="remember"
      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      I agree with the{" "}
      <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
        terms and conditions
      </a>
      .
    </label>
  </div>
  <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onClick={(e) => handleCRegister(e)}
  >
    Submit
  </button>
</form>
            </div>
        </div>

    )
  )
}