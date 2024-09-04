import React, { useState } from 'react';
import './Wave.css';
import Dashboard from '../../dashBoard/Dashboard';


function CustomRoomForm() {
    const [randomNumber, setRandomNumber] = useState('');
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');

    const generateRandomNumber = () => {
        console.log("click");

        // Generate a random number between 1000000 and 9999999
        const number = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
        setRandomNumber(number);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page refresh

        // Check if the Space name is empty
        if (!roomName.trim()) {
            setError('Space Name is required');
            return;
        }

        setError(''); // Clear previous error
        generateRandomNumber(); // Generate and set the random number
    };

    return (
        <div>
            <Dashboard />
            {/* <Notification/> */}
            <div className='z-10' >
                    <form className="form" onSubmit={handleSubmit} style={{ position: "absolute",  top: 100,left:"35%" }}>
                        <div className="form-title"><span>Create your</span></div>
                        <div className="title-2"><span>SPACE</span></div>
                        <div className="input-container">
                            <input
                                placeholder="Space Name"
                                type="text"
                                className="input-mail"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            <span> </span>
                        </div>

                        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

                        <section className="bg-stars">
                            <span className="star"></span>
                            <span className="star"></span>
                            <span className="star"></span>
                            <span className="star"></span>
                        </section>

                        <div className="input-container">
                            <p style={{ borderRadius: 5 }} className="input-pwd bg-white py-3 font-mono text-slate-400 text-sm pl-2">
                                {randomNumber ? `Space ID: ${randomNumber}` : "Press create to get Space ID"}
                            </p>
                        </div>
                        <button className="submit" type="submit">
                            <span className="sign-text">Create</span>
                        </button>

                        <p className="signup-link">
                            Already have Space ID? 
                            <a className="up" href=""> Enter!</a>
                        </p>
                    </form>
                </div>
                
            <div className="main">
                
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    );
}

export default CustomRoomForm;
