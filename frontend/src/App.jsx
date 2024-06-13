import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'



function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
    .then((response) => {
      setJokes(response.data)
    })
    .catch(err => {
      console.log(err);
    })
  })

  return (
    <>
      <h1>Welcome to Home Page</h1>

      <p>JOKES: {jokes.length}</p>
      {jokes.map((joke, index) => (
        <div key = {joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  )
}

export default App
