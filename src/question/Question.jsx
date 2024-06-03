
import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import "./Question.css"
function Question() {
  console.log("question rerender");
  
  return (
    <div>
    <div className='title'>
        <p>Question:</p>
    </div>
    <div className='question'>
    <p>Let’s start with a simple Java program that demonstrates the Fibonacci series. The Fibonacci series is a special type of sequence where each term is the sum of the previous two terms. Here’s an example of how to generate the Fibonacci series in Java:</p>
    </div>
    <hr />
   

    <p className='example' > Example:</p>
    <p>The Fibonacci sequence starts with 0, 1: <br />
Next term: 0 + 1 = 1 <br />
Next term: 1 + 1 = 2 <br />
Next term: 1 + 2 = 3 <br />
And so on…</p>
<hr />  
<p className='output'> Output:</p>
    <p>0 ,1 ,1 2, 3</p>
    </div>

    
  )
}

export default  React.memo(Question)
