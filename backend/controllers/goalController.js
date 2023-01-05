const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @description Get goals
// @route Get /api/goals
// @ access Private
const getGoals = asyncHandler(async (req, res) => {
  console.log(req)
  const goals = await Goal.find({user: req.user.id})
  res.status(200).json(goals)
})

// @description Set goals
// @route POST /api/goals
// @ access Private
const setGoal = asyncHandler(async (req, res) => {
  console.log(req)
  if (!req.body.text) {
    res.status(400)
    throw new Error('No content')
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })
  res.status(200).json(goal)
})

// @description Update goals
// @route PUT /api/goals/:id
// @ access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new new Error('User not found')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.status(200).json(updatedGoal)
})

// @description Delete goals
// @route DELETE /api/goals/:id
// @ access Private
const deleteGoal = asyncHandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id)
  const user = await User.findById(req.user.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new new Error('User not found')
  }
  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}
