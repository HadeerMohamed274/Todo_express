const Joi = require('joi');

// Schema for validating to-do items
const todoSchema = Joi.object({
  title: Joi.string().min(3).required(),
  status: Joi.string().valid('pending', 'completed').required()
});

const validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
  }
  next();
};

module.exports = validateTodo;
