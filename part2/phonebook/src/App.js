import { useState } from 'react'

const Person = ({person}) => {
  return(<p>{person.name}</p>)
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

 const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
 }

 const addNewName = (event) => {
  event.preventDefault()

 


  //add obj only if a user with this name doesn't exist in persons
  const nameExists = persons.some(person => person.name === newName)

  if(!nameExists)
  {
     //new person object
    const obj = {
    name : newName
  }
    setPersons(persons.concat(obj))
  }else{
    alert(`${newName} is already added to phonebook`)
  }

 
  setNewName('')
 }


  return (
    <div>
    <h2>Phonebook</h2>
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} 
        onChange={handleNameChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
   
    {persons.map(person => 
      <Person key={person.name} person={person} />
      )
    }
 
  </div>
  )

}
export default App;
