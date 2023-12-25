/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomer = /* GraphQL */ `
  query GetCustomer($uid: ID!, $cid: ID!) {
    getCustomer(uid: $uid, cid: $cid) {
      uid
      cid
      c_email
      c_ip
      c_location
      c_name
      c_phone
      __typename
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: TableCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        uid
        cid
        c_email
        c_ip
        c_location
        c_name
        c_phone
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($email: String!) {
    getUser(email: $email) {
      email
      uid
      api_keys
      business_name
      business_url
      customers
      orders
      pfp
      subdomain
      subdomain_status
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: TableUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        email
        uid
        api_keys
        business_name
        business_url
        customers
        orders
        pfp
        subdomain
        subdomain_status
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const queryUsersByEmailUidIndex = /* GraphQL */ `
  query QueryUsersByEmailUidIndex($uid: ID!, $first: Int, $after: String) {
    queryUsersByEmailUidIndex(uid: $uid, first: $first, after: $after) {
      items {
        email
        uid
        api_keys
        business_name
        business_url
        customers
        orders
        pfp
        subdomain
        subdomain_status
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserAPIKey = /* GraphQL */ `
  query GetUserAPIKey($uid: ID!, $id: ID!) {
    getUserAPIKey(uid: $uid, id: $id) {
      uid
      id
      apiKey
      pgEnum
      __typename
    }
  }
`;
export const listUserAPIKeys = /* GraphQL */ `
  query ListUserAPIKeys(
    $filter: TableUserAPIKeyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserAPIKeys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        uid
        id
        apiKey
        pgEnum
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($uid: ID!, $orderID: ID!) {
    getOrder(uid: $uid, orderID: $orderID) {
      uid
      orderAmt
      orderCid
      orderCurrency
      orderDescription
      orderID
      orderStatus
      orderTimestamp
      orderUpiTrnx
      __typename
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: TableOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        uid
        orderAmt
        orderCid
        orderCurrency
        orderDescription
        orderID
        orderStatus
        orderTimestamp
        orderUpiTrnx
        __typename
      }
      nextToken
      __typename
    }
  }
`;
