const express = require('express');
const router = express.Router();
const data = require('../models/roomModel');

// GET Routes for/rooms with optional filtering
router.get('/rooms', (req, res) => {
    const { category, price, name, isVegetarian } = req.query;
    
    let filteredRooms = data
      .filter(
        (room) =>
            !category || room.category.toLowerCase() === category.toLowerCase(),
    )
    .filter((room) => !price || room.price < parseFloat(price))
    .filter(
        (room) => !name || room.name.toLowerCase().includes (name.toLowerCase()),
    )
    .filter(
        (room) =>
            isVegetarian === undefined || 
            room.isVegetarian === (isVegetarian === 'true'),
    );

    return filteredRooms.length === 0
    ? res.status(404).json({
        status: 404,
        message: 'No rooms found matching the criteria',
    })
    : res.status(200).json({
        status: 200,
        message: 'Retrieved rooms successfully', 
        data: filteredRooms,
    });

});

// Post
router.post('/rooms', (req, res) => {
    const {name, price, category, isVegetarian} = req.body || {};
// Validation: Check if required frelds are missing
  if (!name || !price || !category || isVegetarian) {
    return res.status(400).json({
        status: 400,
        message:
        'Bad Request: Name. Price, Category, and IsVegetarian are required',
    });
}
    const newItem = { id: data.length + 1, name, price, category, isVegetarian };
    data.push(newItem);
    res.status (201).json({
        status: 201,
        message: 'Room created successfully',
        data: newItem,
    });
});


// PUT Routes for/rooms/sid
router.put('/rooms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((d) => d.id === id);
    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message:'Room with ID ${id} not found',
        });
    }
    data[index] = { id, ...req.body };
    res.status(200).json({
        status: 200,
        message: 'Room updated successfully',
        data: data[index],
    })
});



// DELETE Routes for/rooms/:id
router.delete('/rooms/:id', (req, res)  => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((d) => d.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Room with ID ${id} not found`,
    });
}
    
    data.splice(index, 1);
    res.status(203).json({
        status: 203,
        message: 'Room deleted successfully',
    });
});

        
module.exports = router;
