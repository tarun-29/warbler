import { apiCall } from "../../services/api";
import { addError } from "../actions/error";
import { LOAD_MESSAGES, REMOVE_MESSAGES } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGES,
  id
});

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(e => {
        dispatch(addError(e.message));
      });
  };
};

export const fetchMessages = () => {
  return dispatch => {
    return apiCall("GET", "/api/messages")
      .then(response => {
        dispatch(loadMessages(response));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMessage = text => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, { text })
    .then(res => {
      // res=>{}
    })
    .catch(e => {
      dispatch(addError(e.message));
    });
};
