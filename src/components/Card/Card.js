/* eslint-disable jsx-a11y/alt-text */
import "./Card.css";

export function Card(cardData) {
  // pretty simple card component with a grid style representation for everything except Image. Images had a variable width and height in this API so I decided to leave it out of grid so that I can easily manipulate it using css if needed.
  return (

    <div key={`Card-${cardData.id}`} className={`Card`}>
      <div className="Image">
        <img src={cardData.imageUrl} height="85%"/>
      </div>
      <div></div>
        <div className="Details">
         <span className="Text">Name: </span> {cardData?.name}
          <br></br>
          <span className="Text">Text: </span> {cardData?.text}
          <br></br>
          <span className="Text">Set: </span> {cardData?.set?.name}
          <br></br>
          <span className="Text">Type: </span> {cardData?.type}
      </div>
    </div>
  )
}