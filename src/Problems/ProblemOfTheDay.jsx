import React from 'react'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
function ProblemOfTheDay({ Question, Accuracy, Difficulty ,setPODindex ,length,handlePODClick}) {
    function problemOfTheDay() {
        // Get the current date
        const currentDate = new Date();
        
        // Calculate a "day number" by converting the date to YYYYMMDD format
        const dayNumber = currentDate.getFullYear() * 10000 + 
                          (currentDate.getMonth() + 1) * 100 + 
                          currentDate.getDate();
        
        // Use the day number to select a thought (ensure the same thought for a day)
        const thoughtIndex = dayNumber % length;
        
   
        setPODindex(thoughtIndex)

        handlePODClick();
        // return thoughts[thoughtIndex];
    }
    return (
        <div >
            <div style={{ background: "linear-gradient(to right, #8e2de2, #4a00e0)" }} className='flex gap-36 shine-effect Box  h-24 pt-6 px-3  mt-2 rounded-lg'>


                <div>
                    <div className=" flex flex-col md:flex-row   text-black  w-56 "
                        style={{ clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)", backgroundColor: "gold" }}>
                        <p className="text-sm flex py-1 pl-3">    <p className='pr-2'><TipsAndUpdatesIcon fontSize='sm' /></p>Problem of the day</p>

                    </div>
                    <p className='text-white mt-1 font-bold'>For daily practice</p>
                </div>

                <div style={{}}>

                    <div className='flex gap-2'>

                        <p className='text-sm text-gray-400'>Difficulty</p>
                        <p className='text-sm text-gray-400'>Accuracy</p>
                        <div className='pl-5'>
                            <button onClick={()=>{problemOfTheDay();}} style={{borderRadius:20}} className='bg-blue-50 px-4 py-1 font-bold hover:bg-blue-200'>
                                solve
                            </button>
                        </div>
                    </div>

                    <div className='flex gap-3'>

                        <p className='text-sm text-white'>{Difficulty}</p>
                        <p className='text-sm text-white pl-2.5'>{Accuracy}%</p>
 
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProblemOfTheDay

