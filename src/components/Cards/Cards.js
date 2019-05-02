import React from 'react';
import './style.css';

const Cards = props => {
  const { mag, place, time } = props;
  // console.log(mag, place, time)
  return(
    <div className="card">
      <div className="mag">
        <h1>{mag}</h1>
        <p>magnitude</p>
      </div>
      <h4>{place}</h4>
      <p>{new Date(time).toLocaleString()}</p>
    </div>
  );
}

export default Cards;
