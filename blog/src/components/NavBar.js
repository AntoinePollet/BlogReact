import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { css } from '@emotion/css'

const Nav = styled.nav`
  display: flex;
  border-bottom: 1px grey solid;
`
const Title = styled.h1`
  font-weight: bold;
  color: #04d;
  margin-left: 25px;
`
const List = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const ListItems = styled.li`
  margin-right: 25px;
`
const list = [
  { name: 'About', path: '/about' },
  { name: 'Authors', path: '/authors' },
  { name: 'Create post', path: '/create' },
  { name: 'Contact us', path: '/contactus' },
]

const NavBar = () => {
  return (
    <Nav>
      <Title>
        <Link
          to='/'
          className={css`
            text-decoration: none;
            color: #04d;
            &:hover {
              color: hotpink;
            }
          `}
        >
          SUPDEVINCI
        </Link>
      </Title>
      <List>
        {list.map((item) => (
          <ListItems key={item.name}>
            <Link to={item.path}>{item.name}</Link>
          </ListItems>
        ))}
      </List>
    </Nav>
  )
}

export default NavBar
