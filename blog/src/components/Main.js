import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import About from './About'
import Home from './Home'
import Authors from './Authors'
import Author from './Author'
import Contact from './Contact'
import CreatePost from './CreatePost'
import Post from './Post'

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
    </Switch>
  )
}

export default Main
