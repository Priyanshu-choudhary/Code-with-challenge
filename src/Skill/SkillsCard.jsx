import React from 'react'
import "./card.css"
function SkillsCard({title}) {
    return (
        <div>
            <div className="ag-format-container">
                <div className="ag-courses_box">
                   
                   
                   
                    
                  
                    <div className="ag-courses_item">
                        <a href="#" className="ag-courses-item_link">
                            <div className="ag-courses-item_bg" />
                            <div className="ag-courses-item_title">
                                {title}
                            </div>
                            <div className="ag-courses-item_date-box">
                                Start:
                                <span className="ag-courses-item_date">
                                    8.8.2024
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillsCard
