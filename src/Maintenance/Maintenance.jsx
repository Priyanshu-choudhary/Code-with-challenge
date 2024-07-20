import React from 'react'
import ServerLogo from './serverLogo'

export default function Maintenance() {
    return (
        <div>
            <div style={{ display: "flex" }}>
                <div style={{ position: "absolute", right: 10, marginTop: 10 }}>
                    <img src="server.png" alt="server_maintenance" height={500} width={450} />

                </div>

                <div> 
                    <img src="homeImg.png" alt="CFC_logo" height={500} width={450} />
                </div>

                <div style={{ margin: 50 }}>
                    <ServerLogo />
                </div>
            </div>
            <div style={{ textAlign: "center", width: "100%", height: 70, backgroundColor: "gold", clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)", marginTop: 20 }}>
                <h2 >Scheduled Maintenance Underway</h2>
                <p> <strong>CFC</strong> is currently undergoing maintenance. Please check back shortly. Thank you for your patience.</p>
            </div>
        </div>
    )
}
