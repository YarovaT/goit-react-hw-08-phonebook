import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import actions from './contacts-actions';

const items = createReducer([], {
  [actions.fetchContactsSuccess]: (_, { payload }) =>
    payload.sort((a, b) => a.name.localeCompare(b.name)),
  [actions.addContactSuccess]: (state, { payload }) => [payload, ...state],
  [actions.deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const loading = createReducer(false, {
  [actions.fetchContactsRequest]: () => true,
  [actions.fetchContactsSuccess]: () => false,
  [actions.fetchContactsError]: () => false,

  [actions.addContactRequest]: () => true,
  [actions.addContactSuccess]: () => false,
  [actions.addContactError]: () => false,

  [actions.deleteContactRequest]: () => true,
  [actions.deleteContactSuccess]: () => false,
  [actions.deleteContactError]: () => false,
});

const filter = createReducer('', {
  [actions.searchContacts]: (_, { payload }) => payload,
});

const error = createReducer(null, {
  [actions.fetchContactsError]: (_, { payload }) => payload,
  [actions.addContactError]: (_, { payload }) => payload,
  [actions.deleteContactError]: (_, { payload }) => payload,

  [actions.fetchContactsRequest]: () => null,
  [actions.fetchContactsSuccess]: () => null,

  [actions.addContactRequest]: () => null,
  [actions.addContactSuccess]: () => null,

  [actions.deleteContactRequest]: () => null,
  [actions.deleteContactSuccess]: () => null,
});

export default combineReducers({
  items,
  filter,
  loading,
  error,
});
