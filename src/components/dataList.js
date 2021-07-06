import React, { useEffect, useState } from "react";
import Card from "./card";

const DataList = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const [minAge, setMinAge] = useState(27);
  const [maxAge, setMaxAge] = useState(42);
  const [gender, setGender] = useState("all");

  const getRandomInRange = (min, max) => {
    return (Math.random() * (max - min) + min) | 0;
    
  };


  const processCandidates = (data) => {
    data = data.map((item) => {

      item.age = getRandomInRange(23, 42);
      item.star = false;

      return item;
    });

    return data;
  };

  const handleStarToggle = (id) => {

    console.log('papap toggle:' + id);
    
    /// 1. find the element by id 

    const index = candidates.findIndex(item => {
      if (item.login.uuid == id) return true; 
    })

    let candidatesCopy = [...candidates];
    candidatesCopy[index].star = !candidatesCopy[index].star;

    setCandidates(candidatesCopy); 
    // applyFilters();
    
  }

  const applyFilters = () => {
    const updated = candidates.filter((item) => {
      if (item.age >= minAge && item.age <= maxAge 
                    && (gender === "all" || item.gender === gender )) {
        console.log(">>", minAge, maxAge);
        return true;
      }
      return false;
    });
    setFilteredCandidates(updated);
  };


  const updateMin = (e) => {
    setMinAge(e.target.value);
  };


  const updateMax = (e) => {
    setMaxAge(e.target.value);
  };


  const updateGender = (e) => {
    setGender(e.target.value);
  };


  useEffect(() => {
    applyFilters();
  }, [maxAge, minAge, gender]);


  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((res) => res.json())
      .then((result) => {
        console.log("data", result.results);
        setCandidates(processCandidates(result.results));
        setFilteredCandidates(processCandidates(result.results));
      });
  }, []);


  return (
    <>
      <div className="filters">
        <div>
          <label>age</label>
          <input id="minAge" value={minAge} onChange={updateMin} />

          <input id="maxAge" value={maxAge} onChange={updateMax} />          
        </div>

        <div>
          <p>
          <label>gender</label>

          <select name="gender" id="gender" onChange={updateGender}>
            <option value="all">all</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select></p>
        </div>
        <p>
            {" "}
            selected age : {gender} {minAge} - {maxAge}{" "} , found : { filteredCandidates.length }
        </p>
      </div>

      <div className="board">
        {filteredCandidates.map((item) => (
          // <div className="card">
          //   {item.name.first} {item.name.last}
          //   {item.email}
          //   <img src={item.picture.large} />
          // </div>

          <Card
            id={item.login.uuid}
            name={item.name.first}
            age={item.age}
            picture={item.picture.large}
            onToggle={handleStarToggle}
            star={item.star}
          />
        ))}
      </div>
    </>
  );
};

export default DataList;
