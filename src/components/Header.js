import React from 'react';
import award from "./award.jpg";
import "./style.css";

function Header(){
return(
<div className="app">
    <h1  style={{ fontSize: 50 }}> STAR WARS</h1>
    <h1  style={{ fontSize: 30 }}> Sample project using the SWAPI API</h1>
    <h1 style={{ fontSize: 20 }}> Results are filtered to starships with a crew size less than 10 and sorted by crew size</h1>
    <h1 style={{ fontSize: 20 }}>The Starship that has featured in most of the films will show a return <img src={award} alt="award logo" /></h1>  
</div>
);
}

export default Header;