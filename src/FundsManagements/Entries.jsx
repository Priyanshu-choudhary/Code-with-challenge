import React from 'react'

function Entries({ date, expend, income, heading ,by,to,purpose}) {
    return (
        <div>
            <div className={`  rounded-md px-2   ${heading ? "bg-slate-500 py-3 font-bold text-lg" : "bg-slate-200 border-1 border-blue-900"} m-2`}>

                <div className='flex justify-between'>
                    <p>{date}</p>
                    <p className={`${heading?"text-black":"text-red-700"}`}>{!heading&&<strong>₹</strong>}{expend}</p>
                    <p className={`${heading?"text-black":"text-green-700"}`}>{!heading &&<strong>₹</strong>}{income}</p>
                </div>
               {!heading && <div className='flex justify-between'>
                    <p><strong>By:</strong>{by}</p>
                    <p><strong>To</strong>:{to}</p>
                    <p><strong>Purpose:</strong>{purpose}</p>
                </div>  }
            </div>
        </div>
    )
}

export default Entries
