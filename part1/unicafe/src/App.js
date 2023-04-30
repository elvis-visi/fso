import { useState } from 'react'


const Statistics  = ({good,neutral,bad}) => {

  return (
    <div>
      <h1>Statistics</h1>
      good {good} <br></br>
      neutral {neutral} <br></br>
      bad {bad}
   </div>
  )

}

const Button = ({handleClick, text}) => {
//button event function and name
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


function App() {
// save clicks of each button to its own state
const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)

//clicking handlers
const goodHandler = () => setGood(good + 1)
const neutralHandler = () => setNeutral(good + 1)
const badHandler = () => setBad(good + 1)



  return (
    <div className="App">
      <h1>give feedback</h1>
      <Button handleClick = {goodHandler} text = "good" />
      <Button handleClick = {neutralHandler} text = "neutral" />
      <Button handleClick = {badHandler} text = "bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
