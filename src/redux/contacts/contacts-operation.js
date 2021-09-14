import axios from "axios";
import { toast } from "react-toastify";
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from "./contacts-actions";

const fetchContacts = () => async (dispatch) => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get("/contacts");

    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError());
    if (error.response.status === 404) {
      toast.info("There is no such user's collection!");
    } else if (error.response.status === 500) {
      toast.error("Oops! Server error! Please try later!");
    } else {
      toast.error("Something went wrong! Please reload the page!");
    }
  }
};

const addContact = (name, number) => async (dispatch) => {
  const contact = { name, number };

  dispatch(addContactRequest());

  try {
    const { data } = await axios.post("/contacts", contact);

    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
    if (error.response.status === 400) {
      toast.error("Contact creation error!");
    } else {
      toast.error("Something went wrong! Please reload the page!");
    }
  }
};

const deleteContact = (contactId) => async (dispatch) => {
  dispatch(deleteContactRequest());

  try {
    await axios.delete(`/contacts/${contactId}`);

    dispatch(deleteContactSuccess(contactId));
  } catch (error) {
    dispatch(deleteContactError(error));
    if (error.response.status === 404) {
      toast.info("There is no such user's collection!");
    } else if (error.response.status === 500) {
      toast.error("Oops! Server error! Please try later!");
    } else {
      toast.error("Something went wrong! Please reload the page!");
    }
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchContacts, addContact, deleteContact };
