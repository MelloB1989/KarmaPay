/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer(
    $uid: ID
    $cid: ID
    $c_email: String
    $c_ip: String
    $c_location: String
  ) {
    onCreateCustomer(
      uid: $uid
      cid: $cid
      c_email: $c_email
      c_ip: $c_ip
      c_location: $c_location
    ) {
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer(
    $uid: ID
    $cid: ID
    $c_email: String
    $c_ip: String
    $c_location: String
  ) {
    onUpdateCustomer(
      uid: $uid
      cid: $cid
      c_email: $c_email
      c_ip: $c_ip
      c_location: $c_location
    ) {
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer(
    $uid: ID
    $cid: ID
    $c_email: String
    $c_ip: String
    $c_location: String
  ) {
    onDeleteCustomer(
      uid: $uid
      cid: $cid
      c_email: $c_email
      c_ip: $c_ip
      c_location: $c_location
    ) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $email: String
    $uid: ID
    $api_keys: [ID]
    $business_name: String
    $business_url: String
  ) {
    onCreateUser(
      email: $email
      uid: $uid
      api_keys: $api_keys
      business_name: $business_name
      business_url: $business_url
    ) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $email: String
    $uid: ID
    $api_keys: [ID]
    $business_name: String
    $business_url: String
  ) {
    onUpdateUser(
      email: $email
      uid: $uid
      api_keys: $api_keys
      business_name: $business_name
      business_url: $business_url
    ) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $email: String
    $uid: ID
    $api_keys: [ID]
    $business_name: String
    $business_url: String
  ) {
    onDeleteUser(
      email: $email
      uid: $uid
      api_keys: $api_keys
      business_name: $business_name
      business_url: $business_url
    ) {
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
export const onCreateUserAPIKey = /* GraphQL */ `
  subscription OnCreateUserAPIKey(
    $uid: ID
    $id: ID
    $apiKey: String
    $pgEnum: String
  ) {
    onCreateUserAPIKey(uid: $uid, id: $id, apiKey: $apiKey, pgEnum: $pgEnum) {
      uid
      id
      apiKey
      pgEnum
      __typename
    }
  }
`;
export const onUpdateUserAPIKey = /* GraphQL */ `
  subscription OnUpdateUserAPIKey(
    $uid: ID
    $id: ID
    $apiKey: String
    $pgEnum: String
  ) {
    onUpdateUserAPIKey(uid: $uid, id: $id, apiKey: $apiKey, pgEnum: $pgEnum) {
      uid
      id
      apiKey
      pgEnum
      __typename
    }
  }
`;
export const onDeleteUserAPIKey = /* GraphQL */ `
  subscription OnDeleteUserAPIKey(
    $uid: ID
    $id: ID
    $apiKey: String
    $pgEnum: String
  ) {
    onDeleteUserAPIKey(uid: $uid, id: $id, apiKey: $apiKey, pgEnum: $pgEnum) {
      uid
      id
      apiKey
      pgEnum
      __typename
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder(
    $uid: ID
    $orderAmt: Float
    $orderCid: ID
    $orderCurrency: String
    $orderDescription: String
  ) {
    onCreateOrder(
      uid: $uid
      orderAmt: $orderAmt
      orderCid: $orderCid
      orderCurrency: $orderCurrency
      orderDescription: $orderDescription
    ) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder(
    $uid: ID
    $orderAmt: Float
    $orderCid: ID
    $orderCurrency: String
    $orderDescription: String
  ) {
    onUpdateOrder(
      uid: $uid
      orderAmt: $orderAmt
      orderCid: $orderCid
      orderCurrency: $orderCurrency
      orderDescription: $orderDescription
    ) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder(
    $uid: ID
    $orderAmt: Float
    $orderCid: ID
    $orderCurrency: String
    $orderDescription: String
  ) {
    onDeleteOrder(
      uid: $uid
      orderAmt: $orderAmt
      orderCid: $orderCid
      orderCurrency: $orderCurrency
      orderDescription: $orderDescription
    ) {
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
