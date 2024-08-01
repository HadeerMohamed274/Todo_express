const express = require('express');
const router = express.Router();
const pool = require('./db');
const validateTodo = require('./validation');


router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM todoList');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Fetch a specific to-do item by id
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM todoList WHERE id = ?', [id]);
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ message: 'To-Do item not found' });
      }
    } catch (error) {
      console.error('Error fetching todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Add a new to-do item
  router.post('/', validateTodo, async (req, res) => {
    const { title, status } = req.body;
    try {
      const [result] = await pool.query('INSERT INTO todoList (title, status) VALUES (?, ?)', [title, status]);
      const newTodo = {
        id: result.insertId,
        title,
        status,
      };
      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Update an existing to-do item
  router.put('/:id', validateTodo, async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
    try {
      const [result] = await pool.query('UPDATE todoList SET title = ?, status = ? WHERE id = ?', [title, status, id]);
      if (result.affectedRows > 0) {
        res.json({ id, title, status });
      } else {
        res.status(404).json({ message: 'To-Do item not found' });
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Delete a to-do item
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM todoList WHERE id = ?', [id]);
      if (result.affectedRows > 0) {
        res.json({ message: 'To-Do item deleted' });
      } else {
        res.status(404).json({ message: 'To-Do item not found' });
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;
