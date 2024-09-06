import React from 'react'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
function ProblemOfTheDay({ Question, Accuracy, Diffculity }) {
    return (
        <div >
            <div style={{ background: "linear-gradient(to right, #8e2de2, #4a00e0)" }} className='flex gap-36 shine-effect Box  h-24 pt-6 px-3  mt-2 rounded-lg'>


                <div>
                    <div className=" flex flex-col md:flex-row   text-black  w-48 "
                        style={{ clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)", backgroundColor: "gold" }}>
                        <p className="text-sm flex py-1 pl-3">    <p className='pr-2'><TipsAndUpdatesIcon fontSize='sm' /></p>Problem of the day</p>

                    </div>
                    <p className='text-white mt-1 font-bold'>For daily practice</p>
                </div>

                <div style={{}}>

                    <div className='flex gap-2'>

                        <p className='text-sm text-gray-400'>Diffculity</p>
                        <p className='text-sm text-gray-400'>Accuracy</p>
                        <div className='pl-5'>
                            <button style={{borderRadius:20}} className='bg-blue-50 px-4 py-1 font-bold'>
                                solve
                            </button>
                        </div>
                    </div>

                    <div className='flex gap-3'>

                        <p className='text-sm text-white'>{Diffculity}</p>
                        <p className='text-sm text-white pl-2.5'>{Accuracy}%</p>
                       
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProblemOfTheDay
