import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default apolloProvider;
