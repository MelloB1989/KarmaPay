import { gql } from '@apollo/client';

const querygen = (query, params) => {
  if(query === "createUser")
    return gql`mutation MyMutation {
        createUser(input: {email: \"${params.email}"\, uid: \"${params.uid}\"}) {
          email
        }
      }`
}

module.exports = querygen;