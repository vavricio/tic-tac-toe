import React from "react";
import './Cell.css';

export function Cell(props) {
    return <div className="Cell" onClick={() => props.onClick()}><p className="cellText">{props.value}</p></div>
}