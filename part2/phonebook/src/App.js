import { useState } from 'react'

const Person = ({person}) => {
  return(<p>{person.name}  {person.number}</p>)
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons) 
  
  

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
    number : newNumber
  }
    setPersons(persons.concat(obj))
  }else{
    alert(`${newName} is already added to phonebook`)
  }

  setNewName('')
  setNewNumber('')
 }


  return (
    <div>
    <h2>Phonebook</h2>
    filter shown with
    <input value={filter}
    onChange={handleFilterChange}>
    </input>
    <h2>add a new</h2>

    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} 
        onChange={handleNameChange}
        />
      </div>

      <div>number: <input value={newNumber}
        onChange={handleNumberChange}
      /> </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>

   
  
    <h2>Numbers</h2>
   
    {filteredPersons.map(person => 
      <Person key={person.name} person={person} />
      )
    }
 
  </div>
  )

}
export default App;
