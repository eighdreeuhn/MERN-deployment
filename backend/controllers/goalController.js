const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @description Get goals
// @route Get /api/goals
// @ access Private
const getGoals = asyncHandler(async (req,res) => {
    console.log(req)
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @description Set goals
// @route POST /api/goals
// @ access Private
const setGoal = asyncHandler(async (req,res) => {
    console.log(req)
    if (!req.body.text) {
        res.status(400)
        throw new Error('No content')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

// @description Update goals
// @route PUT /api/goals/:id
// @ access Private
const updateGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})

// @description Delete goals
// @route DELETE /api/goals/:id
// @ access Private
const deleteGoal = asyncHandler(async (req,res) => {
    const deleted = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({id : deleted ? req.params.id : null})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}