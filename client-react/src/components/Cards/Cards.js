import React from 'react'
import Card from '../Card/Card';
import './cards.scss'

const Cards = (props) => {   
  return (
    <>
        <div>All Cards</div>
        {props.cards && props.cards.map((card) => {
            return <Card key={card._id} card={card} />
        })}
    </>
  )
}

export default Cards
