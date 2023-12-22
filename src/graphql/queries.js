/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
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
export const listTransactions = /* GraphQL */ `
  query ListTransactions($userId: ID!) {
    listTransactions(userId: $userId) {
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
