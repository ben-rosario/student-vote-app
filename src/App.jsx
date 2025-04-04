import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import Vote from './components/Vote'

function App() {
  return (
    
    <div className="app">
        <title>ASSC Election Reminder</title>
        <header className="header">
            <h1>ASSC Election Reminder</h1>
        </header>
        <main>
            <Vote />
        </main>
        <footer>
            <p>Created by Ben Rosario   © {new Date().getFullYear()} </p>
            <p>Made using <b>Vite</b>, <b>React</b>, <b>Vercel</b>, and <b>MongoDB</b></p>
        </footer>
    </div>
  )
}

export default App
