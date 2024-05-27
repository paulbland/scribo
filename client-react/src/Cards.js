import React from 'react'
import Card from './Card';

const Cards = (props) => {   
  return (
    <>
        <div>All Cards</div>
        {/* <p>Data from API in cards: {props.cards ? JSON.stringify(props.cards) : 'Loading...'}</p> */}
        {props.cards && props.cards.map((card) => {
            return <Card key={card._id} card={card} />
        })}
    </>
  )
}

export default Cards
