

const Header = (props) => {
  return(
   <>
     <h1>{props.course}</h1>
   </>
  )
 }

 const Part = (props) => {
 // props.item {part, exercise}
  return (
    <p>  {props.item.part} {props.item.exercises} </p>
  )

 }

 
 const Content = (props) => {
   //pass to part an object stored in the array
  const arr = props.parts
  console.log(" parts,", arr)
  
  return (
     <>
      <Part item = {arr[0]}   />
      <Part item = {arr[1]}  />
      <Part item = {arr[2]}  />
     </>
   )
 
 }
 
 const Total = (props) => {

  const arr = props.parts
   return (
     <p>
       Number of exercises {arr[0].exercises + arr[1].exercises + arr[2].exercises}
     </p>
   )
 }
 
 
 
 const App = () => {


const parts = [
  {
    part: 'Fundamentals of React',
    exercises: 10 
  },
  {
    part: 'Using props to pass data',
    exercises: 7
  },
  {
    part: 'State of a component',
    exercises: 14
  }

]
   const course = 'Half Stack application development'

   return (
     <div>
       <Header course={course} />
       <Content parts = {parts} />
       <Total  parts = {parts} />
     </div>
   )
 }
 
 export default App