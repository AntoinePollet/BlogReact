import React from 'react'
import styled from '@emotion/styled'
import NavBar from './components/NavBar'
import Main from './components/Main'
import Footer from './components/Footer'
import { BrowserRouter as Router } from 'react-router-dom'

function App () {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Main />
        <Footer />
      </Router>
    </div>
  )
}

export default App
