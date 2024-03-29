import { useEffect, useRef  } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import {  useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import {setUser, clearUser} from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, Navigate 
} from 'react-router-dom'



const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
  
    }
  }, [])

  const logout = (event) => {
    event.preventDefault()
  dispatch(clearUser())
  navigate('/login')
  }

  // if(user === null) {
  //   return (
  //     <div className="container">
  //     <h2>log in to application</h2>
  //     <Notification/>
  //     <Togglable buttonLabel='login'>
  //       <LoginForm />
  //     </Togglable>
  //     </div>
  //   )
  // }

  ///users View -> who is logged in, logout button, Users -> blogs created
  const padding = {
    padding: 5
  }
  return (
  <>
 <div className="container">
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {/* <Link style={padding} to="/login"></Link> */}
        <span style={padding}>
        <button onClick={logout}>logout</button>
        </span>
      </div>
      <div style={padding}><strong>Blog app</strong></div>
      {/* <div style={padding}>{user.name} logged in</div> */}

      <Notification/>

      <div>

      <Routes>
      
        <Route path="/users/:id" element={<User/>}   />
        <Route path="/" element={<Blogs/>} />
        <Route path="/blogs/:id" element={<Blog/>} />

        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      
        
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm onBlogCreated={() => blogFormRef.current.toggleVisibility()} />
        </Togglable>
   
      </div>
      </div>
      </>

  )
}

export default App