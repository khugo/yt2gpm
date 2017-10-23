import React from "react";

const LoadingSpinner = (props) => (
  <div className="loading-spinner">
    <div className="spinner-container">
      <div className="spinner"/>
    </div>  
    <p>{props.label}</p>
  </div> 
);

export default LoadingSpinner;