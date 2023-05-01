const Course = ({courses}) => {

    return (
      courses.map(course => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))
    );
  
  }
  
  const Header = ({name}) => <h1>{name}</h1>
  
  const Total = ({ parts }) => 
  {
    const total = parts.reduce(
      (prev,current) => prev + current.exercises, 0
    )
  
    return (
      <p>Number of exercises {total}</p>
          )
   }
  
  
  
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => 
    <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
        )}
  
    </>


export default Course