import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { css } from '@emotion/css'

const Nav = styled.nav`
  display: flex;
  box-shadow: 0 5px 20px -10px #fb9a74;
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
        <NavLink
          activeClassName='selected'
          className={css`
            text-decoration: none;
            color: #c62f4f;
            &:hover {
              color: #5c1f55;
              font-weight: bold;
            }
          `}
          activeStyle={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: '#5c1f55',
          }}
          to='/'
        >
          SUPDEVINCI
        </NavLink>
      </Title>
      <List>
        {list.map((item) => (
          <ListItems key={item.name}>
            <NavLink
              activeClassName='selected'
              className={css`
                text-decoration: none;
                color: #c62f4f;
                font-size: 1.2em;
                &:hover {
                  text-transform: uppercase;
                  font-weight: bold;
                  color: #5c1f55;
                }
              `}
              to={item.path}
              activeStyle={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                color: '#5c1f55',
              }}
            >
              {item.name}
            </NavLink>
          </ListItems>
        ))}
      </List>
    </Nav>
  )
}

export default NavBar
