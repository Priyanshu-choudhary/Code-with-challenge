import React, { useContext, useState } from 'react';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Document from './Doc/Doc';
import Todo from '../TodoHeadings/Todo';
import WebDoc from './WebDoc';
    


function ManagerDashbord() {
    const { light, ibg } = useContext(UserContext);
    const [activeComponent, setActiveComponent] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'component1':
                return <WebDoc />;
            case 'component2':
                return <Todo />;
            case 'component3':
                return <Document />;
            default:
                return <div>Select a component to display</div>;
        }
    };

    return (
        <div >
            <Dashboard />
            <div className='flex'>
                <div style={{ backgroundColor: light, width: "17%", height: "100vh", color: ibg }}>
                    <button style={{width:200}} className='btn btn-primary mb-3' onClick={() => setActiveComponent('component1')}>Website Document</button>
                    <br />
                    <button style={{width:200}} className='btn btn-primary mb-3 'onClick={() => setActiveComponent('component2')}>To Do List</button>
                    <br />
                    <button style={{width:200}} className='btn btn-primary mb-3'onClick={() => setActiveComponent('component3')}>Files</button>
                </div>
                <div style={{ width: "75%", height: "100vh" }}>
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default ManagerDashbord;
