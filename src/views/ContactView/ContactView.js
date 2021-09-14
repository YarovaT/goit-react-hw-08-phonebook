import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ContactList from "../../components/ContactList";
import ContactForm from "../../components/ContactForm";
import Filter from "../../components/Filter";
import { contactsOperations } from "../../redux/contacts";
import s from "./ContactView.module.css";

export default function ContactsView() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  return (
    <div className={s.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
}
