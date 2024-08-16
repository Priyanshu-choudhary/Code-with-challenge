import React from 'react'

import BasicButtons from './editbutton'

function Tasks({name,date,timeTake,index,Edit}) {
  return (
    <div>
<div className="flex ml-7 font-bold" style={{  gap: "17%" }} >
        <p>{index}</p>
        <p>{name}</p>
        <p>{timeTake}</p>
        <p>no action</p>
        <p>{date}</p>
       
      
      </div>
    </div>
  )
}

export default Tasks