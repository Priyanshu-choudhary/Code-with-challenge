import React, { useState } from 'react';
import ProblemForm from './ProblemForm';

function TestForm() {
    const handleJsonGenerated = (jsonData) => {
        console.log('Generated JSON Data:', JSON.stringify(jsonData));
        // You can send this JSON to your backend or use it as needed
    };
    const [eventTriggered, setEventTriggered] = useState(false);

    // Define the callback function
    const handleTriggerEvent = () => {
      setEventTriggered(true); // Update state or perform any action
    };
    return (
        <div>

            <div className='ml-8'>
                <h3> Problem</h3>
                <ProblemForm onJsonGenerated={handleJsonGenerated} eventTriggered={eventTriggered} Triggered={setEventTriggered}/>
            </div>
            <div>
                <button className='bg-slate-400 w-full '  onClick={handleTriggerEvent}>Add</button>
               
            </div>
        </div>
    )
}

export default TestForm
