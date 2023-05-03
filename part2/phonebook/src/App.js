import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'
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
  event.preventDefault()
  //add obj only if a user with this name doesn't exist in persons
  const nameExists = persons.some(person => person.name === newName)

  if(!nameExists)
  {
     //new person object
    const obj = {
    name : newName,
    number : newNumber,
    
  }

  personService
  .create(obj)
  .then(returnedPerson => {
    const updatedPersons = persons.concat(returnedPerson)
    setPersons(updatedPersons)

    //update displayFiltered, check for the current filter value
    setFilteredPersons(updatedPersons.filter(person => 
      person.name.toLowerCase().includes(filter.toLocaleLowerCase())))
  })

  //const newPersons = persons.concat(obj)
  //setPersons(newPersons)
 
  }else{
    alert(`${newName} is already added to phonebook`)
  }

  setNewName('')
  setNewNumber('')
 }

  return (
    <div>
    <h2>Phonebook</h2>
    <Filter filter={filter} handleFilterChange={handleFilterChange} /> 
    <h2>add a new</h2>
    <Form addNewName={addNewName} newName={newName} 
    handleNameChange={handleNameChange} newNumber={newNumber}
    handleNumberChange={handleNumberChange} />
    <Persons persons={filteredPersons} />
  
  </div>
  )

}
export default App;
