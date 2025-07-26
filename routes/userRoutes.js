const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Read All
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Filtered Read
router.get('/filter', async (req, res) => {
  const { age, role } = req.query;
  const query = {};
  if (age) query.age = { $gt: Number(age) };
  if (role) query.role = role;
  const users = await User.find(query).select('name email');
  res.json(users);
});

// Update
router.put('/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

// Bulk Update
router.put('/', async (req, res) => {
  await User.updateMany({}, { $inc: { age: 1 } });
  res.json({ message: 'All users’ age increased by 1' });
});

// Delete One
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Bulk Delete
router.delete('/', async (req, res) => {
  await User.deleteMany({ age: { $gt: 50 } });
  res.json({ message: 'Deleted users above 50' });
});

module.exports = router;