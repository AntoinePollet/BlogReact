import React from "react"
import styled from "@emotion/styled"

const Foot = styled.footer`
    border-top: 1px grey solid
`
const List = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ListItems= styled.li`
    margin-right: 25px;
`
const list = [
    {name: 'About', path: 'about'},
    {name: 'Copyright', path: 'copyright'},
    {name: 'Contact us', path: 'contactus'}
]

const Footer = () => {
    return (
        <Foot>
            <List>
                {list.map(item => <ListItems key={item.name}>{item.name}</ListItems>)}
            </List>
        </Foot>
    )
}

export default Footer
