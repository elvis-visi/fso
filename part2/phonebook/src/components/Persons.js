import Person from './Person'

const Persons = ({persons,removePerson}) => {
    //console.log("props persons", props)
   
   return (
    <>
        <h2>Numbers</h2>
        {persons.map(person =>
        <Person key={person.id} person={person} 
        removePerson={removePerson}/>
        )}
    </>
   )

     
  }

  export default Persons