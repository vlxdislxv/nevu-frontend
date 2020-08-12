import gql from "graphql-tag";

export const getChatQuery = gql`
  query chats {
    getChat {
      id
      name
    }
  }
`;

export const profileQuery = gql`
  query {
    profile {
      id
      username
      fullName
    }
  }
`;

export const registerQuery = gql`
  mutation(
    $username: String!
    $password: String!
    $fullName: String!
    $email: String!
  ) {
    register(
      user: {
        username: $username
        password: $password
        fullName: $fullName
        email: $email
      }
    ) {
      token
    }
  }
`;

export const loginQuery = gql`
  mutation($username: String!, $password: String!) {
    login(user: { username: $username, password: $password }) {
      token
    }
  }
`;

export const createChatQuery = gql`
  mutation($userId: Int!) {
    createChat(chat: { with: [$userId] }) {
      id
      name
    }
  }
`;

export const getMessageQuery = gql`
  query getMessage($chatId: Float!) {
    getMessage(chatId: $chatId) {
      id
      text
      from {
        id
        username
        fullName
      }
    }
  }
`;

export const findUserQuery = gql`
  query($search: String!) {
    findUser(user: { search: $search }) {
      id
      username
      fullName
    }
  }
`;

export const addMessageQuery = gql`
  mutation addMessage($text: String!, $chatId: Float!) {
    addMessage(message: { text: $text, chatId: $chatId }) {
      id
      text
      from {
        id
        fullName
        username
      }
    }
  }
`;
