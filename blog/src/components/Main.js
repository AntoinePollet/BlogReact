import React from 'react'
import { Switch, Route } from 'react-router-dom'
import About from './About'
import Home from './Home'
import Authors from './Authors'
import Author from './Author'
import Contact from './Contact'
import CreatePost from './CreatePost'
import Post from './Post'
import Copyright from './Copyright'

const Main = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/post/:id'>
        <Post />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <Route exact path='/authors'>
        <Authors />
      </Route>
      <Route path='/authors/:id'>
        <Author />
      </Route>
      <Route path='/create'>
        <CreatePost />
      </Route>
      <Route path='/contactus'>
        <Contact />
      </Route>
      <Route path='/copyright'>
        <Copyright />
      </Route>
    </Switch>
  )
}

export default Main
