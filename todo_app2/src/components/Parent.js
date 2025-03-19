import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Child1 from './Child1'
import Child2 from './Child2'
import './All.css';

const Parent = ({ color }) => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:6020/api/todo');
            setData(response.data);
            console.log('Fetched data ids:', response.data.id);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addData = async (newData) => {
        setData([...data, newData])
        console.log(data);
    }

    const deleteData = async (id) => {
        try {
            await axios.delete(`http://localhost:6020/api/delete/${id}`);
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:6020/api/update/${id}`, { status: status });
            // Update the state directly
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, status: !status } : item
                )
            );
            await fetchData();
            console.log(`Status of item with id ${id} updated successfully.`);
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    return (
        // Dynamically assign a class to parent-container based on the color prop
        <div className={`parent-container ${color ? 'parent-white' : 'parent-green'}`}>
            <h1> Basic Todo App</h1>
            <Child1 addData={addData} color={color}/>
            <Child2 data={data} onDelete={deleteData} updateStatus={updateStatus} fetchData={fetchData} />
        </div>
    )
}

export default Parent