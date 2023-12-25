import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";

 const apolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: '/api/graphql', // Server URL (must be absolute)
      headers: {
        'token': process.env.GRAPHQL_TOKEN, // Replace with your actual API key
    }
    }),
    cache: new InMemoryCache(),
 });

export default apolloClient;