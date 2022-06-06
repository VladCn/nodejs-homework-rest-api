const Joi = require('joi');

const requiredSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.number()
        .required(),
});

const partialSchema = Joi.object({
    name: Joi.string()
        .min(3),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number(),
});

module.exports = {
    requiredSchema, partialSchema
}