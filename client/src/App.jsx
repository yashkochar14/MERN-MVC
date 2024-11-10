import React from 'react'
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from 'react-router-dom'
import { Container, Menu, Segment } from 'semantic-ui-react'

import Home from './pages/Home'
import Authors from './pages/authors'
import Books from './pages/books'
import Genre from './pages/genre'

const App = () => {
  return (
    <Container>
      <Router>
        <Segment inverted>
          <Menu as='nav' inverted pointing secondary>
            <Menu.Item as={NavLink} to='/' exact name='home' />
            <Menu.Item as={NavLink} to='/authors' name='authors' />
            <Menu.Item as={NavLink} to='/books' name='books' />
            <Menu.Item as={NavLink} to='/genre' name='genre' />
          </Menu>
        </Segment>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/authors' component={Authors} />
          <Route path='/books' component={Books} />
          <Route path='/genre' component={Genre} />
        </Switch>
      </Router>
    </Container>
  )
}

export default App