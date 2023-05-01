import { useState } from 'react'

const Button = ({handleClick, text}) => {

  return (
    <button onClick={handleClick}>
        {text}
    </button>
  )
}

const Display = ({anecdotes,day,dayVotes}) => {

  return(
    <>
      <h1>Anecdote of the day</h1> 
      <div>
          {anecdotes[day]} <br></br>
          has {dayVotes} votes
      </div>
    </>
  )
}

const AnecdoteWithMostVotes = ({anecdotes,points}) => {

  const mostVotes = Math.max(...points); //largest value in the points array
  const mostVotesIndex = points.indexOf(mostVotes)

  return (
    <>
       {anecdotes[mostVotesIndex]} <br></br> has {mostVotes} votes
    </>
  )
  

}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState(
    new Array(anecdotes.length).fill(0))

   const nextAnecdoteHandler = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    console.log("random",random)
    setSelected(random)
   }

   const handleVotes = () => {
    //increase the value of the current selected anecdote on click
    const copy = [...points]  //spread operator
    copy[selected] += 1;
    setPoints(copy)
   }

 

  return (
    <div>
     <Display anecdotes={anecdotes}
      day={selected} dayVotes={points[selected]}/>
      <Button handleClick={handleVotes} text="vote"/>
      <Button handleClick={nextAnecdoteHandler} text="next anecdote"/>
      <AnecdoteWithMostVotes anecdotes={anecdotes} points={points}/>
    </div>
  )
}



export default App;
