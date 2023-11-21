import React from 'react';
import * as NetworkLib from '../NetworkLib.js';

export async function init(drawActions) { 
  NetworkLib.init("mynetwork", drawActions);
}

export default class Network extends React.Component{

  shouldComponentUpdate(nextProps) { 
    return false
  }

  render(){
    console.log("render network");
    return (      
      <div id="mynetwork" style={{ width: '600px', height: "600px" }}></div>
    )
  }
}