import React from 'react'
import './Card.scss'

const Card = (props) => {
  return (
    <>
        <div>Single Card</div>
        <p>Data from API in card: {props?.card?.text ? JSON.stringify(props.card.text) : 'Loading...'}</p>
    </>
  )
}

export default Card