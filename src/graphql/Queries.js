import {gql} from "apollo-boost";

export const GET_LISTS = gql`
  {
    lists(order_by: { created_at: asc }) {
      id
      created_at
      name
      cards {
        id
        name
      }
    }
  }
`;

export const CREATE_LIST = gql`
  mutation($name: String!) {
    insert_lists(objects: [{ name: $name }]) {
      affected_rows
    }
  }
`;

export const DELETE_LIST = gql`
  mutation($id: Int!) {
    delete_lists(where: { id: {_eq: $id} }) {
      affected_rows
    }
  }
`;

export const DELETE_CARD = gql`
  mutation($id: Int!) {
    delete_cards(where: { id: {_eq: $id} }) {
      affected_rows
    }
  }
`;

export const CREATE_CARD = gql`
  mutation($name: String!, $list_id: Int!) {
    insert_cards(objects: [{ name: $name, list_id: $list_id }]) {
      affected_rows
    }
  }
`;

export const CHANGE_CARD_LIST = gql`
  mutation($id: Int!, $list_id: Int!) {
    update_cards(where: {id: {_eq: $id}}, _set: {list_id: $list_id}) {
      affected_rows
    }
  }
`;