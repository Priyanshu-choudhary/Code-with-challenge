import React from 'react';
import BasicButtons from './editbutton';

function Table({ data }) {
  return (
    <table className="table table-bordered table-hover mt-4 ">
      <thead className="thead-dark">
        <tr>
          <th scope="col" style={{width:60,backgroundColor:"rgb(0, 0, 0)",color:"rgb(255 255 255)"}}>Index</th>
          <th scope="col" style={{width:100 ,textAlign: 'center' ,backgroundColor:"rgb(0, 0, 0)",color:"rgb(255 255 255)"}} >Team Member</th>
          <th scope="col" style={{width:100,textAlign: 'center' ,backgroundColor:"rgb(0 0 0)",color:"rgb(255 255 255)"}}>Time Given</th>
          <th scope="col" style={{width:100,textAlign: 'center' ,backgroundColor:"rgb(0, 0, 0)",color:"rgb(255 255 255)"}}>Action</th>
          <th scope="col" style={{width:100,textAlign: 'center' ,backgroundColor:"rgb(0 0 0)",color:"rgb(255 255 255)"}}>Date</th>
          <th scope="col" style={{width:100,textAlign: 'center' , backgroundColor:"rgb(0, 0, 0)",color:"rgb(255 255 255)"}}>Edit</th>
          <th scope="col"  style={{textAlign: 'center' , backgroundColor:"rgb(0 0 0)",color:"rgb(255 255 255)"}} >Status</th>
          
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.teamMember}</td>
            <td>{item.timeGiven}</td>
            <td>{item.action}</td>
            <td>{item.date}</td>
            <td><BasicButtons Edit={item.Edit}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
