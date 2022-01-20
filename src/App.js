import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import Form from './components/ContactsForm/ContactsForm';
import ContactList from './components/ContactsList/ContactsList';
import Container from './components/Container/Container';
import Filter from './components/Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App(params) {
    const [contacts, setContacts] = useState(() => {
        return (
            JSON.parse(window.localStorage.getItem('contacts')) ??
            defaultContacts
        );
    });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const normalizedValue = value => {
        return value.toLowerCase();
    };

    const contactSubmitHandler = data => {
        const contact = {
            id: shortid.generate(),
            name: data.name,
            number: data.number,
        };
// console.log(contacts);
        contacts.find(
            contact =>
                contact.name.toLowerCase() === normalizedValue(data.name),
        )
            ? notify(`${data.name} is already in contact`)
            : setContacts([contact, ...contacts]);
    };
// console.log(contacts);
    const contactDeleteHandler = contactId => {
        return setContacts(
            contacts.filter(contact => contact.id !== contactId),
        );
    };

    const handleFilterChange = event => {
        setFilter(event.currentTarget.value);
    };

    const getFilteredContacts = () => {
        const normalizedFilter = normalizedValue(filter);
        return contacts.filter(contact =>
            normalizedValue(contact.name).includes(normalizedFilter),
        );
    };

    const notify = message =>
        toast(message, {
            position: toast.POSITION.TOP_CENTER,
            className: toast,
        });

    return (
        <Container>
            <div >
                <div >
                    <h1>Phonebook</h1>
                    <Form onSubmit={contactSubmitHandler} />
                </div>
                <div className={contacts}>
                    <h2>Contacts</h2>
                    <Filter value={filter} onChange={handleFilterChange} />

                    <ContactList
                        contacts={getFilteredContacts()}
                        onDelete={contactDeleteHandler}
                    />
                    <ToastContainer />
                </div>
            </div>
        </Container>
    );
}

export default App;