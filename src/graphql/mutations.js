/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer($input: DeleteCustomerInput!) {
    deleteCustomer(input: $input) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
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
export const createUserAPIKey = /* GraphQL */ `
  mutation CreateUserAPIKey($input: CreateUserAPIKeyInput!) {
    createUserAPIKey(input: $input) {
      uid
      id
      apiKey
      pgEnum
      __typename
    }
  }
`;
export const updateUserAPIKey = /* GraphQL */ `
  mutation UpdateUserAPIKey($input: UpdateUserAPIKeyInput!) {
    updateUserAPIKey(input: $input) {
      uid
      id
      apiKey
      pgEnum
      __typename
    }
  }
`;
export const deleteUserAPIKey = /* GraphQL */ `
  mutation DeleteUserAPIKey($input: DeleteUserAPIKeyInput!) {
    deleteUserAPIKey(input: $input) {
      uid
      id
      apiKey
      pgEnum
      __typename
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder($input: DeleteOrderInput!) {
    deleteOrder(input: $input) {
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
