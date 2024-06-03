import React from 'react'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
function MyOptions() {
    console.log("myOption rerender");
    return (
        <div>
               <DropdownButton variant="link" as={ButtonGroup} title="Editor Options" id="bg-nested-dropdown">
                <Dropdown.Item eventKey="1">Theme: light</Dropdown.Item>
                <Dropdown.Item eventKey="2">Theme: light</Dropdown.Item>
                <Dropdown.Item eventKey="2">Font Size +</Dropdown.Item>
                <Dropdown.Item eventKey="2">Font Size -</Dropdown.Item>
                <Dropdown.Item eventKey="4">Tab Space</Dropdown.Item>
                <Dropdown.Item eventKey="5">Reset Settings</Dropdown.Item>
            </DropdownButton>   


            <DropdownButton variant="link" as={ButtonGroup} title="Change Language" id="bg-nested-dropdown">
                <Dropdown.Item eventKey="1">Java</Dropdown.Item>
                <Dropdown.Item eventKey="2">C</Dropdown.Item>
                <Dropdown.Item eventKey="3">C++</Dropdown.Item>
                <Dropdown.Item eventKey="4">Python</Dropdown.Item>
                <Dropdown.Item eventKey="5">JavaScript</Dropdown.Item>
            </DropdownButton>

         
        </div>
    )
}

export default React.memo(MyOptions)
