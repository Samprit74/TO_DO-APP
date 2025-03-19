const express = require('express');
const route = express.Router();
const data = require('./schema');
const mongoose = require('mongoose');

//get method
route.get('/todo', async (req, res) => {
  try {
    const todoItems = await data.find();
    if (todoItems.length === 0) {
      return res.status(404).json({ message: 'No items found' });
    }
    const structuredItems = todoItems.map(({ title, _id, status }) => ({
      title,
      id: _id,
      status,
    }));
    res.status(200).json(structuredItems);
    console.log(structuredItems)
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});
//post method
route.post('/todo', async (req, res) => {
  try {
    const { title } = req.body;
    const newItem = new data({ title });
    const savedItem = await newItem.save();
    res.status(201).json({
      id: savedItem._id, // Map MongoDB's _id to id
      title: savedItem.title,
      status: savedItem.status,

    });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Server Error');
  }

})

//delete by id
route.delete('/delete/:id', async (req, res) => {
  console.log('Delete request received for ID:', req.params.id);
  try {
    const deletedItem = await data.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully', deletedItem });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err.message });
  }
});

//update status by id
route.put('/update/:id', async (req, res) => {
  console.log('put request received for ID:', req.params.id);
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      
      return res.status(400).json({ message: 'Invalid ID format '+id });
    }
    const updatedStatus = await data.findByIdAndUpdate(
      id,
      { status: !status },
      { new: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Status updated successfully', updatedStatus });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
})


module.exports = route;