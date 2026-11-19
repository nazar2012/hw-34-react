
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchContacts,
    addContact,
    deleteContact,
    changeFilter,
} from "./redux/contactsSlice";

import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

import "./App.css";

function App() {
    const dispatch = useDispatch();

    const contacts = useSelector(
        (state) => state.contacts.items
    );

    const filter = useSelector(
        (state) => state.filter
    );

    const isLoading = useSelector(
        (state) => state.contacts.isLoading
    );

    const error = useSelector(
        (state) => state.contacts.error
    );

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    const handleAdd = async (contact) => {
        const isDuplicate = contacts.some(
            (item) =>
                item.name.toLowerCase() ===
                contact.name.toLowerCase()
        );

        if (isDuplicate) {
            alert("Такий контакт вже існує");
            return false;
        }

        try {
            await dispatch(addContact(contact)).unwrap();
            return true;
        } catch {
            return false;
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteContact(id));
    };

    const handleFilterChange = (value) => {
        dispatch(changeFilter(value));
    };

    return (
        <div className="app">
            <h1>Phonebook</h1>

            <h2>Add contact</h2>

            <ContactForm onAdd={handleAdd} />

            <h2>Contacts</h2>

            <SearchBox
                filter={filter}
                onChange={handleFilterChange}
            />

            {isLoading && <p>Loading...</p>}

            {error && <p className="error-message">{error}</p>}

            <ContactList
                contacts={filteredContacts}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;
