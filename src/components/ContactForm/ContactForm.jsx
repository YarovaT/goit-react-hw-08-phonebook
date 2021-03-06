import { useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import { connect } from "react-redux";
import style from "./ContactForm.module.css";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { contactsSelectors, contactsOperations } from "../../redux/contacts";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#52BE80",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "#145A32",
      borderColor: "#145A32",
      boxShadow: "none",
    },
  },
}));

const initialState = {
  name: "",
  number: "",
};

function ContactForm({ contacts, onSubmit }) {
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const { name, number } = state;
  const isLoading = useSelector(contactsSelectors.getLoading);

  const handleInputOnChange = (event) => {
    const { name, value } = event.currentTarget;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const normalizedName = name.toLowerCase();

  const nameInContacts = contacts.find(
    (contact) => contact.name === normalizedName
  );

  const numberInContacts = contacts.find(
    (contact) => contact.number === number
  );

  const chekedIsEmptyField = (name, number) => {
    return name.trim() === "" || number.trim() === "";
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (chekedIsEmptyField(name, number)) {
      toast.info("Fill in the input fields name and number!");
    } else if (!nameInContacts && !numberInContacts) {
      onSubmit(name, number);
      reset();
      return;
    }
    toast.warn(`${name} is already in phonebook !`);
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <form onSubmit={onSubmitHandler} className={style.form}>
      <div className={style.formGroup}>
        <label>
          Name{" "}
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Z??-????-??]+(([' -][a-zA-Z??-????-?? ])?[a-zA-Z??-????-??]*)*$"
            title="?????? ?????????? ???????????????? ???????????? ???? ????????, ??????????????????, ???????? ?? ????????????????. ???????????????? Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan ?? ??. ??."
            required
            onChange={handleInputOnChange}
          />
        </label>

        <label>
          Number{" "}
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="?????????? ???????????????? ???????????? ???????????????? ???????? ?? ?????????? ?????????????????? ??????????????, ????????, ?????????????? ???????????? ?? ?????????? ???????????????????? ?? +"
            required
            onChange={handleInputOnChange}
          />
        </label>
      </div>

      {!isLoading && (
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add contact
        </Button>
      )}

      {isLoading && <Loader />}
    </form>
  );
}

const mapStateToProps = (state) => ({
  contacts: contactsSelectors.getContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (name, number) =>
    dispatch(contactsOperations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
