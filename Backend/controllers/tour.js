const express = require('express');
const Tour = require('../models/tour');
const mongoose = require('mongoose');

const addTour = async (req, res) => {
    const tour = req.body;

    try {
        const newTour = new Tour({
            ...tour,
            creator: req.userId,
            createdAt: new Date().toISOString()
        });

        await newTour.save();
        res.status(201).json(newTour);
        console.log(newTour);

    } catch (err) {
        res.status(404).json({
            message: 'Something went wrong'
        })
        console.log(err);
    }
}

const getTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (err) {
        res.status(404).json({
            message: 'Tours not found'
        })
    }
}

const getTour = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById(id);
        res.status(200).json(tour);
    } catch(err) {
        res.status(400).json({
            message: 'Tour not found'
        })
    }
}

const getToursByUsers = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "User does not exist"
        })
    } else {
        const userTours = await Tour.find({
            creator: id
        });
        res.status(200).json(userTours);
    }
}

module.exports = { addTour, getTours, getTour, getToursByUsers };