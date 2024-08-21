import React from 'react'

function FundCards({ color,data,title }) {
    return (
        <div>
            <div className={`w-40 border-2   h-20 rounded-2xl ${color=="red"?"border-red-500":data<0?"border-red-500":"border-green-500"}`}>
                <p className='text-center font-extrabold text-4xl pt-2'>{data}</p>
                <p className='text-center  '>{title}</p>
            </div>
        </div>
    )
}

export default FundCards
