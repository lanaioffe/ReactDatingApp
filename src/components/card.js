import React, { useEffect, useState } from "react";
import "./card.css";
import Star from "./star";


const Card = (props) => {

  const handleStarToggle = () => {
    console.log('clickkkkkk'); 
    props.onToggle(props.id);
  }

  return (
    <>
      <div className="card">

        <h4>{props.name}</h4>
        

        <div  >

          <img className="img" src={props.picture} />
        </div>

        <div className="age">
          {props.age}
        </div>


        <Star star={props.star} onToggle={handleStarToggle} />


      </div>
    </>
  );
};

export default Card;
