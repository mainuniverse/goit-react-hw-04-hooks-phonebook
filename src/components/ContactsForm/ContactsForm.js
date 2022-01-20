import React, { useState } from 'react';
import PropsType from 'prop-types';
import s from './ContactsForm.module.css';
import shortid from 'shortid';

function Form(props) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };


    const handleSubmit = event => {
        event.preventDefault();
        props.onSubmit({name, number});
        reset();
    };

   const nameInputId = shortid.generate();
   const numberInputId = shortid.generate();

   const reset = () => {
       setName('');
       setNumber('');
   };

        return (
            <div>
                <form onSubmit={handleSubmit} className={s.form}>
              <label htmlFor={nameInputId} className={s.label}>
                 <p className={s.formName}>Name </p> 
                        Name
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            id={nameInputId}
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Имя может состоять только из букв, апострофа, тире и пробелов. 
                            Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                            required
                        />
                    </label>
                    <label htmlFor={numberInputId} className={s.label}>
                        <p className={s.formNumber}> Number</p>
                        <input
                            type="tel"
                            name="number"
                            value={number}
                            onChange={handleChange}
                            id={numberInputId}
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                            required
                        />
                    </label>
                    <button className={s.button} type="submit">
                        Add contact
                    </button>
                </form>
            </div>
        );
    }



Form.propTypes = {
   onSubmit: PropsType.func.isRequired,
};

export default Form;