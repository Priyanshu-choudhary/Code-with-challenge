import React, { useContext, useState } from 'react';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Document from './Doc/Doc';
import Todo from '../TodoHeadings/Todo';


function ManagerDashbord() {
    const { light, ibg } = useContext(UserContext);
    const [activeComponent, setActiveComponent] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'component1':
                return <Document />;
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
                <div style={{ backgroundColor: light, width: "20%", height: "100vh", color: ibg }}>
                    <button className='btn btn-primary mb-3' onClick={() => setActiveComponent('component1')}>Documents files</button>
                    <br />
                    <button className='btn btn-primary mb-3'onClick={() => setActiveComponent('component2')}>To Do List</button>
                    <br />
                    <button className='btn btn-primary mb-3'onClick={() => setActiveComponent('component3')}>XXX</button>
                </div>
                <div style={{ width: "75%", height: "100vh" }}>
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default ManagerDashbord;
