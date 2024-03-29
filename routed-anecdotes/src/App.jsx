import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useMatch, useNavigate
} from 'react-router-dom'

import  { useField } from './hooks/index'

const Menu = ({anecdotes, addNew}) => {
  const padding = {
    paddingRight: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match //if the url matches
  ? anecdotes.find(an => an.id === Number(match.params.id))
  : null

  console.log(`match `, match)

  return (
    <>
      <div>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/create">create</Link>
        <Link style={padding} to="/about">about</Link>
       
     </div>

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route  path="/about"  element={<About/>}  />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />}   />       
       </Routes>
       </>
  )
}

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href ='{anecdote.info}'>{anecdote.info}</a> </p>
    </div>
  )

}


const AnecdoteList = ({ anecdotes }) => (
  
  //links for each anecdote
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  const navigate = useNavigate()



  const contentObj = useField('text')
  const authorObj = useField('text')
  const infoObj = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
     content: contentObj.value,
      author: authorObj.value,
      info: infoObj.value,
      votes: 0
    })
    navigate('/anecdotes')
  }

  const resetAll = (event) => {
    event.preventDefault()
    contentObj.reset()
    authorObj.reset()
    infoObj.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...contentObj} />
        </div>
        <div>
          author
          <input name='author' {...authorObj} />
        </div>
        <div>
          url for more info
          <input name='info' {...infoObj}/>
        </div>
        <button type='submit'>create</button>
        <button onClick={resetAll}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({notification}) => {
 
  if(!notification) {
    return null
  }

  return (
      <div>{notification}</div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created`)

    setTimeout(()=> {
      setNotification(null)
    },4000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
 
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification}/>
      <Menu anecdotes={anecdotes}
      addNew ={addNew}
      />
     
      <Footer />
    </div>
 
  )
}

export default App
