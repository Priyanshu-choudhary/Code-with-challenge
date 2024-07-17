import React, { useState, useEffect } from 'react';
import GetStartButton from '/src/Buttons/GetStart';
import { useNavigate, useLocation } from 'react-router-dom';
function GettingStart({ days, hours, minutes, isRegistered }) {
    const [isStart, setisStart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (days <= 150 && hours <= 100) {
            setisStart(true);
        } else {
            setisStart(false);
        }
    }, [minutes, hours, days]);

    const handelClick = () => {
        console.log("click");
        navigate(`/vhgfh7t67xw5458gf5643sd6/${contest.nameOfContest}`)
    };

    return (    
        <div>
            {isRegistered && !isStart &&
                <div style={{ textAlign: "center", width: "100%", height: 70, backgroundColor: "gold", clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)", marginTop: 20 }}>
                    <p style={{ paddingTop: 20, fontSize: "20px" }}>The <strong> Start window </strong> will open one hour prior to the scheduled time.</p>
                </div>
            }
            {isStart &&
                <div style={{ textAlign: "center", width: "100%", height: 70, backgroundColor: "gold", clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)", marginTop: 20 }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
                        Your contest will be <strong style={{ marginLeft: 7, marginRight: 7 }}> Live </strong> soon.
                        <GetStartButton value={"Start"} onClick={handelClick} />
                    </div>
                </div>
            }
        </div>
    );
}

export default GettingStart;
