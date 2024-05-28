import React, { useState } from 'react'
import './Card.scss'

const Card = (props) => {  
  const cardStyles = [1,2,3,4,5];
  const [isFlipped, setIsFlipped] = useState(false);

  // color is state and might chnge - update
  // text might be too i guess
  return (
    <li className="card">
      <div className={"wrapper style-" + (props.card.color) + (isFlipped ? ' flipped' : '')}> 
        <div className="front">
          <textarea placeholder={"Type here..."} value={props.card.text}></textarea>
          <a className="flip-card" onClick={() => setIsFlipped(!isFlipped)}></a>
        </div>
        <div className="back">
          Select color:
          <form>
            <ul className="card-style">
              {cardStyles.map((style) => {
                return (
                  <li key={style} className={"card-style-" + style}>
                    <label>
                      <input type="radio" name="card_style" value={style} checked={props.card.color === style} />
                      <span></span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </form>
          <a href="#" className="delete-card">Delete this card</a><br />
          <a className="flip-card" onClick={() => setIsFlipped(!isFlipped)}></a>
        </div>
      </div>
    </li>
  )
}

export default Card
