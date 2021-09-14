import { useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import style from "./ContactForm.module.css";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { contactsSelectors, contactsOperations } from "../../redux/contacts";

import Loader from "../Loader";

const initialState = {
  name: "",
  number: "",
};

function ContactForm({ onSubmit }) {
  const [state, setState] = useState(initialState);
  const { name, number } = state;

  const contacts = useSelector(contactsSelectors.getContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);

  const handleInputOnChange = (event) => {
    const { name, value } = event.currentTarget;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const normalizedName = name.toLowerCase();
    const nameInContacts = contacts.find(
      (contact) => contact.name === normalizedName
    );
    const numberInContacts = contacts.find(
      (contact) => contact.number === number
    );

    if (e.currentTarget.name === "") {
      toast.info("Fill in the input fields name and number!");
      return;
    }
    if (!nameInContacts && !numberInContacts) {
      onSubmit(normalizedName, number);
      reset();
      return;
    }
    toast.warn(`${name} is already in phonebook !`);
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={style.formGroup}>
        <label>
          Name{" "}
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
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
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={handleInputOnChange}
          />
        </label>
      </div>

      {!isLoading && (
        <Button type="submit" variant="contained" startIcon={<AddIcon />}>
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
