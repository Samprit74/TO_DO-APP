import React, { useState } from 'react'
import axios from 'axios'
import './All.css';
import AddCardIcon from '@mui/icons-material/AddCard';

const Child1 = ({ addData, color }) => {
    const [newdata, setNewdata] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        //setNewdata(e.target.value);
        if (newdata.trim()) {
            const response = await axios.post('http://localhost:6020/api/todo', { title: newdata });
            const r = response.data;
            setNewdata('');
            await addData(r);
        }
        console.log('data submitting function called');
        console.log(newdata);
    };

    return (
        // Dynamically assign a class to child1-container based on the color prop
        <div className={`child1-container ${color ? 'child1-white' : 'child1-green'}`}>
            <h2> enter work here</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter new data"
                    value={newdata}
                    onChange={(e) => setNewdata(e.target.value)}
                />
                <button type="submit"><AddCardIcon/>+</button>
            </form>
        </div>
    );
};


export default Child1