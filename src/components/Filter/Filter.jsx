import React from "react";
import "./Filter.module.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { contactsSelectors, contactsActions } from "../../redux/contacts";

const Filter = ({ value, onChange }) => {
  return (
    <label>
      Find contacts by name
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  value: contactsSelectors.getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (event) =>
    dispatch(contactsActions.searchContacts(event.currentTarget.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
