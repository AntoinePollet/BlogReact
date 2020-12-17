import React from 'react'
import NavBar from './components/NavBar'
import Main from './components/Main'
import Footer from './components/Footer'
import { css } from '@emotion/css'
import { BrowserRouter as Router } from 'react-router-dom'

function App () {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Main
          className={css`
            height: 100%;
            flex-grow: 1;
          `}
        />
        <Footer />
      </Router>
    </div>
  )
}

export default App
