import React, { useEffect } from 'react';
import './All.css';
import { Checkbox } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BackpackIcon from '@mui/icons-material/Backpack';

const Child2 = ({ data, onDelete, updateStatus, fetchData }) => {


  return (
    <div className='child2-container'>
      <h1>work lists <BackpackIcon/></h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Checkbox checked={item.status} onChange={() => updateStatus(item.id, item.status)} color="success" />
            <span className={item.status ? 'completed' : 'pending'}>
              {item.title}</span>
              
            <div className='status_delete'>
              {item.status ? <TaskAltIcon/> : <PendingActionsIcon/>}
              <button onClick={() => onDelete(item.id)}><DeleteOutlineIcon/></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Child2;