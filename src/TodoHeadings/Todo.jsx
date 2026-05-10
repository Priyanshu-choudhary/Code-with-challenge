import React from "react";
import ListIcon from "@mui/icons-material/List";
import Tasks from "./Tasks";
import Table from "./table";
import { blue } from "@mui/material/colors";

function Todo() {
  const tableData = [
    { teamMember: 'Yadi ', timeGiven: '1 Day', action: 'Incompleted', date: '2024-08-19' ,description:"Topics wise Practice backend work"},
    { teamMember: 'Yadi ', timeGiven: '1 Day', action: 'Incompleted', date: '2024-08-19' ,description:"Learn page backend implementation"},
    { teamMember: 'Yadi ', timeGiven: '--', action: 'Incompleted', date: '2024-08-20' ,description:"Money management app for CFC"},
    { teamMember: 'Prince', timeGiven: '1 Day', action: 'Incompleted', date: '2024-08-20' ,description:"About Us page "},
    { teamMember: 'Prince', timeGiven: '--', action: 'Incompleted', date: '2024-08-20' ,description:"Poster printing and taking premission "},
    { teamMember: 'Hem', timeGiven: '1 Day', action: 'Incompleted', date: '2024-08-20' ,description:"Document content prepare"},
    { teamMember: 'Rimjhim', timeGiven: '--', action: 'Incompleted', date: '2024-08-20' ,description:"Javascript course coding question"},
    { teamMember: 'pranjali', timeGiven: '--', action: 'Incompleted', date: '2024-08-20' ,description:"Java course coding question"},
    { teamMember: 'All members', timeGiven: '--', action: 'Incompleted', date: '2024-08-27' ,description:"Data review and uploads "},

    // Add more data as needed
  ];
  return (
    <div className="m-1 border-2 border-stone-400 rounded">
      <div className="flex font-bold text-2xl p-3 bg-gray-200" >
        <ListIcon fontSize="large mr-4 mt-1"/>
        <p>Task List</p>
      </div>
      <Table data={tableData} />
    </div>

  );
}

export default Todo;

