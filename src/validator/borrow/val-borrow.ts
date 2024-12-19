import Joi from 'joi';

// Schema for creating a new book
export const bookCreateSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  author: Joi.string().required().messages({
    'string.empty': 'Author is required',
    'any.required': 'Author is required',
  }),
  isbn: Joi.string().length(13).required().messages({
    'string.empty': 'ISBN is required',
    'string.length': 'ISBN must be exactly 13 characters',
    'any.required': 'ISBN is required',
  }),
  totalCopies: Joi.number().integer().min(1).required().messages({
    'number.base': 'Total copies must be a number',
    'number.min': 'Total copies must be at least 1',
    'any.required': 'Total copies are required',
  }),
});

// Schema for updating an existing book
export const bookUpdateSchema = Joi.object({
  title: Joi.string().optional().messages({
    'string.empty': 'Title cannot be empty',
  }),
  author: Joi.string().optional().messages({
    'string.empty': 'Author cannot be empty',
  }),
  isbn: Joi.string().length(13).optional().messages({
    'string.length': 'ISBN must be exactly 13 characters',
  }),
  totalCopies: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Total copies must be a number',
    'number.min': 'Total copies must be at least 1',
  }),
});
