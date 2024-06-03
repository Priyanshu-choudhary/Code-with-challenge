import React from 'react'
import Button from 'react-bootstrap/Button';

function SubmitSec() {
  console.log("submitsec rerender");
  return (
    <div>
          <Button style={{marginTop:"4px"}} variant="secondary">Run</Button>{' '}
          <Button style={{marginTop:"4px"}}variant="secondary">Submit</Button>{' '}
    </div>
  )
}

export default  React.memo(SubmitSec)
