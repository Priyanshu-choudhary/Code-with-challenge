import React from 'react'
import Dashboard from '../dashBoard/Dashboard'
import ProblemOfTheDay from './ProblemOfTheDay'
import './ProblemSet.css'
import ShuffleIcon from '@mui/icons-material/Shuffle';
import DataList from './DataList';

function ProblemSet() {
    return (
        <div>
            <Dashboard />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ProblemOfTheDay Accuracy={80.4} Diffculity={"Medium"} />
            </div>

            <div className='pt-4 flex  md:gap-44' style={{ display: "flex", justifyContent: "center" }}>
                <div >
                    <input type="text" class="custom-input" placeholder="Search Question" />
                </div>
                <div>
                    <button style={{ borderRadius: 20 }} className='flex gap-2 border-2 border-gray-300 px-2 py-1.5 font-bold'>
                        <ShuffleIcon /> Random
                    </button>
                </div>
            </div>

            <div className='mt-2' style={{ display: "flex", justifyContent: "center" }}>
                <div className='bg-blue-50 rounded-t-lg flex gap-5 space-x-4 py-3 px-2'>
                    <span style={{minWidth:225}}>Title</span>
                    <span >Difficulty</span>
                    <span>Accuracy </span>
                    <span>Action</span>
                </div>

            </div>
            <div
  className=""
  style={{
    display: "flex",
    flexDirection: "column", // Align items vertically
    alignItems: "center",    // Center items horizontally
    justifyContent: "center", // Center items vertically
    textAlign: "center" // Center text within each DataList component
  }}
>
  <DataList title={"Reverse the string"} Difficulty={"Easy"} Accuracy={92.2} tags={"string"} />
  <DataList title={"Hello world"} Difficulty={"Medium"} Accuracy={87.6} tags={"simple"} />
  <DataList title={"matrix"} Difficulty={"Hard"} Accuracy={55.8} tags={"Maths"} />
</div>

        </div>
    )
}

export default ProblemSet
