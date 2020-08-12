import gql from "graphql-tag";

export const getChatQuery = gql`
  query chats {
    getChat {
      id
      name
    }
  }
`;
