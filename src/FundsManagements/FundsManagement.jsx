import React from 'react'
import LineChart from './LineChart'
import FundCards from './FundCards'
import Entries from './Entries'

function FundsManagement() {
    const dummyEntries = [
        { date: "12/2/2024", income: 100, expend: 0, by: "Yadi", to: "Adarsh", purpose: "Salary" },
        { date: "13/2/2024", income: 200, expend: 50, by: "Priya", to: "Mohan", purpose: "Bonus" },
        { date: "14/2/2024", income: 0, expend: 300, by: "Ravi", to: "Shyam", purpose: "Rent" },
        { date: "15/2/2024", income: 500, expend: 0, by: "Suman", to: "Rita", purpose: "Loan" },
        { date: "16/2/2024", income: 0, expend: 100, by: "Arun", to: "Gopal", purpose: "Utilities" },
        { date: "17/2/2024", income: 300, expend: 150, by: "Vikram", to: "Neha", purpose: "Groceries" },
        { date: "18/2/2024", income: 100, expend: 20, by: "Karan", to: "Ravi", purpose: "Travel" },
        { date: "19/2/2024", income: 400, expend: 100, by: "Pooja", to: "Rahul", purpose: "Gifts" },
        { date: "20/2/2024", income: 200, expend: 0, by: "Amit", to: "Sita", purpose: "Freelance" },
        { date: "21/2/2024", income: 150, expend: 60, by: "Naina", to: "Manoj", purpose: "Shopping" }
    ];

    return (
        <div>
            <div className='mx-10 mt-16 flex' style={{ justifyContent: "space-between" }}>
                <FundCards title={"Income"} data={0} />
                <FundCards title={"Expenses"} color={"red"} data={500} />
                <FundCards title={"Total"} data={-500} />
            </div>
            <LineChart />
            <div style={{ justifyContent: "space-around", width: "85%" }} className="flex absolute top-16  bg-gray-500 text-white p-1">
                <p>Overall</p>
                <p>Day</p>
                <p>Month</p>
                <p>Year</p>
            </div>
            <div className='bg-blue-100 mt-4 p-2 rounded-md'>
                <div className='HEADING'>
                    <Entries heading={true} date={"Date"} income={"Income"} expend={"Expenses"} />
                </div>
                {dummyEntries.map((entry, index) => (
                    <Entries 
                        key={index}
                        date={entry.date}
                        income={entry.income}
                        expend={entry.expend}
                        by={entry.by}
                        to={entry.to}
                        purpose={entry.purpose}
                    />
                ))}
            </div>
        </div>
    )
}

export default FundsManagement
