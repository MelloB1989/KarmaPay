import { gql } from '@apollo/client';
import { uuid } from 'uuidv4';

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
        updateOrder(input: {orderAmt: 1.5, orderCid: "", orderCurrency: "", orderDescription: "", orderID: "", orderStatus: "", orderUpiTrnx: "", orderTimestamp: "", uid: ""}) {
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
  else if(query === "createAPIKey")
      return gql`mutation MyMutation {
        createUserAPIKey(input: {uid: \"${params.uid}\", pgEnum: \"${params.pgEnum}\", id: \"${uuid()}\", apiKey: "${params.apiKey}"}) {
          id
        }
      }`
  else if(query === "listAPIKeys")
      return gql`query MyQuery {
        listUserAPIKeys(filter: {uid: {eq: \"${params.uid}\"}}) {
          items {
            apiKey
            id
            pgEnum
            uid
          }
        }
      }`
    else if(query === "updateAPIKey_MO")
      return gql`mutation MyMutation($input: UpdateUserAPIKeyInput!) {
        updateUserAPIKey(input: $input) {
          apiKey
        }
      }`
    else if(query === "createAPIKey_MO")
      return gql`mutation MyMutation($input: CreateUserAPIKeyInput!) {
        createUserAPIKey(input: $input) {
          apiKey
        }
      }`
    else if(query === "listAPIKeys_QO")
      return gql`query MyQuery($filter: TableUserAPIKeyFilterInput) {
        listUserAPIKeys(filter: $filter) {
          items {
            apiKey
            id
            pgEnum
            uid
          }
          nextToken
        }
      }`
    else if(query === "createCustomer")
      return gql`mutation MyMutation {
        createCustomer(input: {c_email: \"${params.email}\", c_ip: \"${params.ip}\", c_location: \"${params.location}\", c_name: \"${params.name}\", c_phone: \"${params.phone}\", cid: \"${uuid()}\", uid: \"${params.uid}\"}) {
          cid
        }
      }`
    else if(query === "getOrder")
      return gql`query MyQuery {
        getOrder(orderID: \"${params.order_id}\", uid: \"${params.uid}\") {
          orderAmt
          orderCid
          orderCurrency
          orderDescription
          orderStatus
          orderID
          uid
          orderUpiTrnx
          orderTimestamp
        }
      }`
}

module.exports = querygen;