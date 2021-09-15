import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { contactsSelectors, contactsActions } from "../../redux/contacts";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px",
    padding: "20px",
    display: " block",
    color: "#000000",
    textTransform: "uppercase",
    fontSize: "12px",
    background: "#669966",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    lineHeight: "10px",
    width: "100%",
    borderColor: "black",
  },
}));

const Filter = ({ value, onChange }) => {
  const classes = useStyles();

  const contacts = useSelector(contactsSelectors.getContacts);

  return (
    <form className={classes.root}>
      {contacts.length > 0 && (
        <TextField
          className={classes.input}
          id="standard-search"
          label=" Find contacts by name"
          type="search"
          value={value}
          onChange={onChange}
          variant="outlined"
        >
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </TextField>
      )}
    </form>
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
