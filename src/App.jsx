import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm'

function App() {
  return (
    
    <div className="app">
        <title>ASSC Election Reminder</title>
        <header className="header">
            <h1>ASSC Election Reminder</h1>
        </header>
        <main>
            <RegistrationForm />
        </main>
        <footer>
            <p>Created by Ben Rosario   © {new Date().getFullYear()} | Made using <b>Vite</b>, <b>React</b>, and <b>MongoDB</b></p>
        </footer>
    </div>
  )
}

export default App
