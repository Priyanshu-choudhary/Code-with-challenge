import React from 'react';
import BasicButtons from './editbutton';

// Function to generate a consistent color for each team member
const generateColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 80%)`; // Generating a color using HSL
  return color;
};

function Table({ data }) {
  return (
    <table className="table table-bordered table-hover mt-4">
      <thead className="thead-dark">
        <tr>
          <th scope="col" style={{ width: 60, backgroundColor: "rgb(0, 0, 0)", color: "rgb(255 255 255)" }}>Index</th>
          <th scope="col" style={{ width: 100, textAlign: 'center', backgroundColor: "rgb(0, 0, 0)", color: "rgb(255 255 255)" }}>Team Member</th>
          <th scope="col" style={{ width: 100, textAlign: 'center', backgroundColor: "rgb(0 0 0)", color: "rgb(255 255 255)" }}>Time Given</th>
          <th scope="col" style={{ width: 100, textAlign: 'center', backgroundColor: "rgb(0, 0, 0)", color: "rgb(255 255 255)" }}>Status</th>
          <th scope="col" style={{ width: 100, textAlign: 'center', backgroundColor: "rgb(0 0 0)", color: "rgb(255 255 255)" }}>Date</th>
          <th scope="col" style={{ width: 100, textAlign: 'center', backgroundColor: "rgb(0, 0, 0)", color: "rgb(255 255 255)" }}>Edit</th>
          <th scope="col" style={{ textAlign: 'center', backgroundColor: "rgb(0 0 0)", color: "rgb(255 255 255)" }}>Work</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} >
            <th scope="row">{index + 1}</th>
            <td style={{ backgroundColor: generateColor(item.teamMember) }}>{item.teamMember}</td>
            <td>{item.timeGiven}</td>
            <td style={{ backgroundColor: item.action === 'Complete' ? 'light green' : 'lightcoral', color: 'white' }}>{item.action}</td>
            <td>{item.date}</td>
            <td><BasicButtons Edit={item.Edit} /></td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

