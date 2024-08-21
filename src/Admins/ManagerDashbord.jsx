import React, { useContext, useState } from 'react';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Document from './Doc/Doc';
import Todo from '../TodoHeadings/Todo';

import FundsManagement from '../FundsManagements/FundsManagement';
import DocumentPage from '../Document/DocumentPage';
    


function ManagerDashbord() {
    const { light, ibg } = useContext(UserContext);
    const [activeComponent, setActiveComponent] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'component1':
                return <DocumentPage />;
            case 'component2':
                return <Todo />;
            case 'component3':
                return <Document />;
            case 'component4':
                return <FundsManagement />;
            default:
                return <Todo />;
        }
    };

    return (
        <div >
            <Dashboard />
            <div className='Side-Drover flex'>
                <div style={{ backgroundColor: light, width: "17%", height: "100vh", color: ibg }}>
                    <button style={{width:200}} className='btn btn-primary mb-3' onClick={() => setActiveComponent('component1')}>Website Document</button>
                    <br />
                    <button style={{width:200}} className='btn btn-primary mb-3 'onClick={() => setActiveComponent('component2')}>To Do List</button>
                    <br />
                    <button style={{width:200}} className='btn btn-primary mb-3'onClick={() => setActiveComponent('component3')}>Files</button>
                    <br />
                    <button style={{width:200}} className='btn btn-primary mb-3'onClick={() => setActiveComponent('component4')}>Funds Management</button>
                </div>
                <div style={{ width: "100%", height: "100vh" }}>
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default ManagerDashbord;
