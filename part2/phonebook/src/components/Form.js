
const Form = ({addNewName,newName,newNumber,setNewName,setNewNumber
}) => {
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
   }
  
   const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
   }

    return (

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
    )

}

export default Form