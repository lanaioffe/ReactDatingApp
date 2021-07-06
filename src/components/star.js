import React, { useEffect, useState } from "react";

import starOffIcon from './pics/starBlue.png';
import starOnIcon from './pics/starYellow.png';


const Star = (props) => {


//   const [showStar, setShowStar] = useState(false);


  const getStar = () => {
    //if (!showStar) return starOffIcon;
    if (!props.star) return starOffIcon;
    return starOnIcon;
  }


  const handleStarClick = () => {

    props.onToggle();


    // setShowStar(!showStar);
    // getStar();
  }

  
  return (
    <>          
        <div>
          <img className="star" src={getStar()} onClick={handleStarClick} />
        </div>
    </>
  );
};

export default Star;
