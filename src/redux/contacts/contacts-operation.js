import axios from 'axios';
import { toast } from 'react-toastify';

// import { v4 as uuidv4 } from 'uuid';
import actions from './contacts-actions';

axios.defaults.baseURL = 'http://localhost:3131';

const fetchContacts = () => async dispatch => {
  dispatch(actions.fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');

    dispatch(actions.fetchContactsSuccess(data));
  } catch (error) {
    dispatch(actions.fetchContactsError());
    toast.error(error.message);
  }
};

const addContact = (name, number) => async dispatch => {
  const contact = { name, number };

  dispatch(actions.addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contact);

    dispatch(actions.addContactSuccess(data));
  } catch (error) {
    dispatch(actions.addContactError(error));
    toast.error(error.message);
  }
};

const deleteContact = contactId => async dispatch => {
  dispatch(actions.deleteContactRequest());

  try {
    await axios.delete(`/contacts/${contactId}`);

    dispatch(actions.deleteContactSuccess(contactId));
  } catch (error) {
    dispatch(actions.deleteContactError(error));
    toast.error(error.message);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchContacts, addContact, deleteContact };
