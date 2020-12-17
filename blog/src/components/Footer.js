import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/css'
import { NavLink } from 'react-router-dom'

const Foot = styled.footer`
  padding: 20px 0 20px 0;
  box-shadow: 0 -5px 10px -5px #fb9a74;
`
const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ListItems = styled.li`
  margin-right: 25px;
`
const list = [
  { name: 'About', path: '/about' },
  { name: 'Copyright', path: '/copyright' },
  { name: 'Contact us', path: '/contactus' },
]

const Footer = () => {
  return (
    <Foot>
      <List>
        {list.map((item) => (
          <ListItems key={item.name}>
            <NavLink
              to={item.path}
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
                &:focus {
                  text-transform: uppercase;
                  font-weight: bold;
                  color: #5c1f55;
                }
              `}
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
    </Foot>
  )
}

export default Footer
