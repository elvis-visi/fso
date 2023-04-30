import { useState } from 'react'


const StatisticLine = ({text,value,suffix }) => {
  return(
   <tr>
    <td>{text} </td>
    <td>{value} {suffix} </td>
   </tr>
  )
}

const Statistics  = ({good,neutral,bad}) => {
//average score (good: 1, neutral: 0, bad: -1)
let totalReviews = good + neutral + bad;
let average = (good - bad) / totalReviews
let positive = good / totalReviews * 100
  
if(totalReviews === 0)
{
  return (
    <div>
      <br></br>
      No feedback given
    </div>
  )
}

return (
    <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="total" value={totalReviews}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive} suffix={'%'} />
          </tbody>
        </table>
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
const neutralHandler = () => setNeutral(neutral + 1)
const badHandler = () => setBad(bad + 1)



  return (
    <>
      <div className="App">
        <h1>give feedback</h1>
        <Button handleClick = {goodHandler} text = "good" />
        <Button handleClick = {neutralHandler} text = "neutral" />
        <Button handleClick = {badHandler} text = "bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  );
}

export default App;
