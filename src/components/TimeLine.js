import * as TimeLineLib from "../TimeLineLib.js"

export async function init(drawActions) {
  TimeLineLib.init("visualization", drawActions);  
}


export default function TimeLine() {
  return (<div id="visualization"></div>)
}