import React, { useState, useContext, useCallback, useEffect } from 'react';
import './EditorComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../Context/UserContext';
import BasicDetail from './BasicDetail';
import CodeGenrate from './CodeGenrate';
import FinalSend from './FinallSend';

const EditorPosts = ({ step, uploadUrl ,contestName}) => {
    const { user, password, role } = useContext(UserContext);


       return (
        <>
            {step === 1 && (
                <BasicDetail />
            )}


            {step === 2 && (
                <CodeGenrate />
            )}

            {step === 3 && (
                <FinalSend contestName={contestName} uploadUrl={uploadUrl} />
            )}
        </>
    );
};

export default EditorPosts;
