import Person from './Person'

const Persons = ({persons}) => {
    //console.log("props persons", props)
   
   return (
    <>
        <h2>Numbers</h2>
        {persons.map(person =>
        <Person key={person.id} person={person}/>
        )}
    </>
   )

     
  }

  export default Persons