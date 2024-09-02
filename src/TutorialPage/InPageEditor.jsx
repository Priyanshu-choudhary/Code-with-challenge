import React from 'react'
import EditorComponent from '../onlineEditor/EditorComponent'

function InPageEditor({initialValue}) {
  return (
    <div>
      <EditorComponent initialValue={initialValue}/>
    </div>
  )
}

export default InPageEditor
