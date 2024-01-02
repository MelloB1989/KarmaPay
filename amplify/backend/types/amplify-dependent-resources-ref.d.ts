export type AmplifyDependentResourcesAttributes = {
  "api": {
    "karmapay": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "KarmaPay": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "CreatedSNSRole": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "karmausersGroupRole": "string"
    }
  },
  "storage": {
    "s3karmapaystorage1ddbb09e": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}