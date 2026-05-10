import React, { useState, useEffect } from 'react';
import './Wave.css';
import Dashboard from '../../dashBoard/Dashboard';

function CustomRoomForm() {
    const [randomNumber, setRandomNumber] = useState('');
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = 'black';

        // Cleanup function to reset background color when the component is unmounted
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const generateRandomNumber = () => {
        console.log("click");

        const number = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
        setRandomNumber(number);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!roomName.trim()) {
            setError('Space Name is required');
            return;
        }

        setError('');
        generateRandomNumber();
    };

    return (
        <div>
            <Dashboard />
            <div className='z-10'>
                <form className="form" onSubmit={handleSubmit} style={{ position: "absolute", top: 100, left: "35%" }}>
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

