import Joi from 'joi';

export const createDeviceSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  serialNumber: Joi.string().alphanum().min(5).max(20).required(),
  creationDate: Joi.date().optional(),
});


export const updateDeviceSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  serialNumber: Joi.string().alphanum().min(5).max(20),
  creationDate: Joi.date(),
}).min(1); 