import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactsList.module.css';


const ContactList = ({ contacts, onDelete}) => {
    return (
        <ul className={s.list}>
            {contacts.map(({ id, name, number }) => (
                <li key={id} className={s.item}>
                    <p>
                        {name}: {number}
                    </p>
                    <button
                        type="button"
                        onClick={() => onDelete(id)}
                        className={s.btn_delete}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.array,
    onDelete: PropTypes.func,
};

export default ContactList;