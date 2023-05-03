import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons) 
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      const data = initialPersons
      setPersons(data)
      setFilteredPersons(data)
    })
  },[])

  const updateFilteredPersons = (updatedPersons) => {
    setFilteredPersons(updatedPersons.filter(person =>
      person.name.toLowerCase().includes(filter.toLocaleLowerCase()))
    );
  };

  const removePerson = (id) => {
    //make sure the person exists
    const person = persons.find((p) => p.id === id);
    if (person && window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== id);
          setPersons(updatedPersons);
          // Update the filteredPersons based on the current filter value
          updateFilteredPersons(updatedPersons);  
        });
    }
  }
  

 const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
 }

 const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
 }

 const handleFilterChange = (event) => {
  console.log(event.target.value)
  setFilter(event.target.value)

  //filter persons
  const perArray = persons.filter(person => person.name.toLowerCase().
    includes(event.target.value.toLowerCase()))
  console.log("filtered", perArray)
  setFilteredPersons(perArray)

 }



 const addNewName = (event) => {
  event.preventDefault();

  const existingPerson = persons.find(person => person.name === newName);

  const newPerson = {
    name: newName,
    number: newNumber,
  };

  if (existingPerson) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(existingPerson.id, newPerson)
        .then(updatedPerson => {
          const updatedPersons = persons.map(person => person.id !== existingPerson.id ? person : updatedPerson);
          setPersons(updatedPersons);

          // Update the filteredPersons based on the current filter value
          updateFilteredPersons(updatedPersons);
        })
        .catch(error => {
          console.log('Error updating person:', error);
        });
    }
  } else {
    personService
      .create(newPerson)
      .then(returnedPerson => {
        const updatedPersons = persons.concat(returnedPerson);
        setPersons(updatedPersons);

        // Update the filteredPersons based on the current filter value
        updateFilteredPersons(updatedPersons);
      });
  }

  setNewName('');
  setNewNumber('');
};



  return (
    <div>
    <h2>Phonebook</h2>
    <Filter filter={filter} handleFilterChange={handleFilterChange} /> 
    <h2>add a new</h2>
    <Form addNewName={addNewName} newName={newName} 
    handleNameChange={handleNameChange} newNumber={newNumber}
    handleNumberChange={handleNumberChange} />
    <Persons persons={filteredPersons} removePerson={removePerson} />
  
  </div>
  )

}
export default App;
