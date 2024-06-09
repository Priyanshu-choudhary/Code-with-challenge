import React from 'react'
import "./OutputSec.css"
function OutputSec(props) {
  console.log("output rerender");
   
  return (
    <div>
   <h1 className='Question'>Output:</h1>
   <br className='line' />
   <pre>{props.output} </pre>
  </div>
  )
}

export default  React.memo(OutputSec)
