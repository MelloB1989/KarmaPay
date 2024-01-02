import { gql } from '@apollo/client';

const querygen = (query, params) => {
  if(query === "createUser")
    return gql`mutation MyMutation {
        createUser(input: {email: \"${params.email}"\, uid: \"${params.uid}\"}) {
          email
        }
      }`
  else if(query === "listOrders")
    return gql`query MyQuery {
        listOrders(filter: {uid: {eq: \"${params.uid}\"}}, limit: 10) {
          items {
            orderAmt
            orderCid
            orderCurrency
            orderDescription
            orderID
            orderStatus
            orderTimestamp
            orderUpiTrnx
          }
          nextToken
        }
      }`
  else if(query === "createOrder")
      return gql`mutation MyMutation {
        createOrder(input: {orderAmt: ${params.orderAmt}, orderCid: \"${params.orderCid}\", orderCurrency: \"${params.orderCurrency}\", orderDescription: \"${params.orderDescription}\", orderID: \"${params.orderID}\", orderStatus: \"${params.orderStatus}\", orderTimestamp: \"${params.orderTimestamp}\", orderUpiTrnx: \"${params.orderUpiTrnx}\", uid: \"${params.uid}\"}) {
          orderID
        }
      }`
  else if(query === "updateOrderStatus")
      return gql`mutation MyMutation {
        updateOrder(input: {orderID: \"${params.orderID}\", orderStatus: \"${params.orderStatus}\", uid: \"${params.uid}\"}) {
          orderID
        }
      }`
  else if(query === "updateUser")
      return gql`mutation MyMutation {
        updateUser(input: {
          ${params?.email ? `email: \"${params.email}\", ` : ``}
          ${params?.business_url ? `business_url: \"${params.business_url}\", ` : ``}
          ${params?.business_name ? `business_name: \"${params.business_name}\", ` : ``}
          ${params?.pfp ? `pfp: \"${params.pfp}\", ` : ``}
          ${params?.subdomain ? `subdomain: \"${params.subdomain}\", ` : ``}
          ${params?.subdomain_status ? `subdomain_status: \"${params.subdomain_status}\", ` : ``}
          uid: \"${params.uid}\"}) {
          uid
        }
      }`
  else if(query === "getUser")
      return gql`query MyQuery {
        getUser(email: \"${params.email}\") {
          uid
          business_url
          business_name
          pfp
          subdomain
          subdomain_status
        }
      }`
  else if(query === "updateUser_MO")
      return gql`mutation MyMutation($input: UpdateUserInput!) {
        updateUser(input: $input) {
          email
        }
      }`
}

module.exports = querygen;