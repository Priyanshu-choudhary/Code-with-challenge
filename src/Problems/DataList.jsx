import React from 'react';

function DataList({ title, Difficulty, Accuracy, tags }) {
    return (
        <div className="flex flex-col">
            <div className="hover:bg-slate-100 flex items-center py-2 px-2 cursor-pointer space-x-4">
                {/* Title and Tags */}
                <div className="flex flex-col text-left" style={{ minWidth: `${Difficulty=="Medium"?"305px":"320px"}` }}>
                    <span className="font-medium">{title}</span>
                    <div className="text-sm text-gray-500">{tags}</div>
                </div>

                {/* Difficulty */}
                <div className="flex-grow">
                    <span
                        className={`text-sm ${Difficulty === "Easy"
                            ? "text-green-400"
                            : Difficulty === "Medium"
                                ? "text-orange-400"
                                : Difficulty === "Hard"
                                    ? "text-red-400"
                                    : ""
                            }`}
                    >
                        {Difficulty}
                    </span>
                </div>

                {/* Accuracy */}
                <div className="flex justify-center" style={{ minWidth: "80px" }}>
                    <span className="text-sm">{Accuracy}%</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                    <button
                        style={{ borderRadius: 20 }}
                        className="border border-gray-300 px-2 text-sm hover:bg-blue-300"
                    >
                        Delete
                    </button>
                    <button
                        style={{ borderRadius: 20 }}
                        className="border border-gray-300 px-2 text-sm hover:bg-blue-300"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {/* Separator Line */}
            <p className="bg-gray-400" style={{ height: "1px", width: "100%" }}></p>
        </div>
    );
}

export default DataList;
