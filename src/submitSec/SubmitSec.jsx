import React from 'react'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function SubmitSec({ onRun, onSubmit, isRunning = false, isSubmitting = false }) {
  return (
    <div>
      <Button style={{ marginTop: "4px" }} variant="secondary" onClick={onRun} disabled={isRunning || isSubmitting}>
        Run {isRunning && <Spinner animation="border" size="sm" style={{ marginLeft: 4 }} />}
      </Button>{' '}
      <Button style={{ marginTop: "4px" }} variant="success" onClick={onSubmit} disabled={isRunning || isSubmitting}>
        Submit {isSubmitting && <Spinner animation="border" size="sm" style={{ marginLeft: 4 }} />}
      </Button>{' '}
    </div>
  )
}

export default React.memo(SubmitSec)
