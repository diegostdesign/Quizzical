import { useState, useEffect } from 'react'
import yellowblob from "./assets/yellow-blob.png"
import blueblob from "./assets/light-blue-blob.png"
import Intro from "./components/Intro.jsx"
import Questions from "./components/Questions.jsx"

export default function App() {
  const [hasStarted, setHasStarted] = useState(false)

  function toggleStart(){
    setHasStarted(prevState => !prevState)
  }

  return (
    <main className="main--container">
      {hasStarted === false && <Intro toggleStart={toggleStart} />}
      {hasStarted === true && <Questions toggleStart={toggleStart} />}
    </main>
  )
}
