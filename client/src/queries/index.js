import { gql } from 'apollo-boost';

// RECIPES Queries
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      name
      description
      instructions
      category
      likes
      created
    }
  }
`;

// RECIPES Mutations

// USERS Queries

// USERS Mutations
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
