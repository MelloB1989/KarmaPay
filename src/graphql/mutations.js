/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      phone
      apiKeys {
        key
        service
        __typename
      }
      transactions {
        id
        amount
        date
        status
        __typename
      }
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      phone
      apiKeys {
        key
        service
        __typename
      }
      transactions {
        id
        amount
        date
        status
        __typename
      }
      __typename
    }
  }
`;
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      amount
      date
      status
      user {
        id
        name
        email
        phone
        __typename
      }
      __typename
    }
  }
`;
export const updateTransactionStatus = /* GraphQL */ `
  mutation UpdateTransactionStatus($id: ID!, $status: TransactionStatus!) {
    updateTransactionStatus(id: $id, status: $status) {
      id
      amount
      date
      status
      user {
        id
        name
        email
        phone
        __typename
      }
      __typename
    }
  }
`;
