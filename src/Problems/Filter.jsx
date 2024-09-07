import React from 'react'

function Filter() {
    return (
        <div className='min-w-64'>
            <div className=' m-1 mt-4 mb-4 border-1 border-gray-600 rounded-2xl '>
                <p  className=' rounded-t-2xl py-2  w-full text-center font-bold text-gray-500 bg-blue-50 hover:bg-gray-100'>
                    Filters
                </p>
                <p className="bg-gray-400" style={{ height: "1px", width: "100%" }}></p>
                <p style={{ borderRadius: 0 }} className='pl-3  py-2   w-full hover:bg-gray-100'>
                    Topics
                </p>

                <p className="bg-gray-400" style={{ height: "1px", width: "100%" }}></p>
                <p style={{ borderRadius: 0 }} className='pl-3   py-2  w-full hover:bg-gray-100'>
                    Companies
                </p>

                <p className="bg-gray-400" style={{ height: "1px", width: "100%" }}></p>
                <p style={{ borderRadius: 0 }} className='pl-3   py-2  w-full hover:bg-gray-100 '>
                    Difficulty

                </p>
                <p className="bg-gray-400" style={{ height: "1px", width: "100%" }}></p>

                <p style={{ borderRadius: 0 }} className='pl-3   py-2   w-full hover:bg-gray-100'>
                    Status
                </p>


            </div>
        </div>
    )
}

export default Filter
