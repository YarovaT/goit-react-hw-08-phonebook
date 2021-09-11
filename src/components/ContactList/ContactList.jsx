import React from 'react';
import ContactItem from './ContactItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ol>
      {contacts.map(({ name, number, id }) => (
        <ContactItem
          key={id}
          name={name}
          number={number}
          onClick={() => onDeleteContact(id)}
        />
      ))}
    </ol>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

// const getVisibleContacts = (allContacts, filter) => {
//   const normalizedFilter = filter.toLowerCase();

//   return allContacts.filter(({ name }) =>
//     name.toLowerCase().includes(normalizedFilter),
//   );
// };

const mapStateToProps = state => ({
  contacts: contactsSelectors.getfilteredContacts(state),
});

// const mapStateToProps = ({ contacts: { items, filter } }) => ({
//   contacts: getVisibleContacts(items, filter),
// });

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
