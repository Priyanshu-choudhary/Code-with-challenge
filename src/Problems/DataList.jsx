import React from 'react'

function DataList({ title, Difficulty, Accuracy,tags }) {
    return (
        <div >
            <div className='hover:bg-slate-100  flex gap-6 space-x-4 py-2 px-2 cursor-pointer'>
                <span className='max-w-52'>{title}
                    <div className='text-sm text-gray-500'>
                        {tags}
                    </div>
                </span>
                <span className={`text-sm ${Difficulty === "Easy"
                        ? "text-green-400"
                        : Difficulty === "Medium"
                            ? "text-orange-400"
                            : Difficulty === "Hard"
                                ? "text-red-400"
                                : ""
                    }`}>
                    {Difficulty}
                </span>

                <span className='text-sm pl-14'>{Accuracy}%</span>
                <div >
                    <button style={{ borderRadius: 20 }} className='border-1 text-sm border-gray-300 px-2 '>
                        Delete
                    </button>
                    <button style={{ borderRadius: 20 }} className='ml-2 border-1 text-sm border-gray-300 px-2 '>
                        Edit
                    </button>
                </div>

            </div>
            <p style={{ width: 600, height: 1 }} className='bg-gray-400  '></p>
        </div>
    )
}

export default DataList
