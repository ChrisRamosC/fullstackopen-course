import { useEffect, useState } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import axios from 'axios';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (isPersonAdded()) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newPhone };
        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : returnedPerson
              )
            );
            addNotification({ type: 'success', text: `Updated ${newName}` });
          })
          .then(() => {
            setNewName('');
            setNewPhone('');
          })
          .catch((error) => {
            addNotification({
              type: 'error',
              text: `Information of ${newName} has already been removed from server`,
            });
            console.log(error);
            setPersons(persons.filter((n) => n.name !== newName));
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newPhone,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      addNotification({ type: 'success', text: `Added ${newName}` });
      setNewName('');
      setNewPhone('');
    });
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handlePhoneChange = (event) => setNewPhone(event.target.value);

  const handleFilterChange = (event) => setFilter(event.target.value);

  const isPersonAdded = () => persons.some((person) => person.name === newName);

  const addNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage({});
    }, 5000);
  };

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          addNotification({ type: 'success', text: `Deleted ${name}` });
        })
        .catch((error) => {
          addNotification({
            type: 'error',
            text: `Information of ${name} has already been removed from server`,
          });
          console.log(error);
          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        phoneValue={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
