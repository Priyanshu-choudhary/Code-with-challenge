// Modal.js
import React, { useState } from 'react';

const modalStyles = {
    overlay: {
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        background: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '300px',
        textAlign: 'center',
        position: 'relative',
    },
    textarea: {
        width: '100%',
        height: '100px',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        color: 'white',
    },
    submitButtonHover: {
        backgroundColor: '#0056b3',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    closeButtonHover: {
        backgroundColor: '#c82333',
    },
};

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [customData, setCustomData] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(customData);
        onClose();
    };

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <button
                    style={modalStyles.closeButton}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = modalStyles.closeButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = modalStyles.closeButton.backgroundColor}
                    onClick={onClose}
                >
                    &times;
                </button>
                <textarea
                    style={modalStyles.textarea}
                    value={customData}
                    onChange={(e) => setCustomData(e.target.value)}
                    placeholder="Enter your custom data..."
                />
                <button
                    style={{ ...modalStyles.button, ...modalStyles.submitButton }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = modalStyles.submitButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = modalStyles.submitButton.backgroundColor}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Modal;

