const Joi = require('joi');

// Phone validation: E.164 format (e.g. +919876543210)
const phoneSchema = Joi.string()
  .pattern(/^\+[1-9]\d{6,14}$/)
  .required()
  .messages({
    'string.pattern.base': 'Phone must be in E.164 format (e.g. +919876543210)',
    'any.required': 'Phone number is required'
  });

const schemas = {
  sendOTP: Joi.object({
    phone: phoneSchema
  }),

  verifyOTP: Joi.object({
    phone: phoneSchema,
    code: Joi.string()
      .length(6)
      .pattern(/^\d{6}$/)
      .required()
      .messages({
        'string.length': 'OTP must be exactly 6 digits',
        'string.pattern.base': 'OTP must be numeric',
        'any.required': 'OTP code is required'
      })
  }),

  refreshToken: Joi.object({
    refreshToken: Joi.string().required()
  })
};

/**
 * Express middleware factory for request body validation.
 */
function validate(schemaName) {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) return next(new Error(`Unknown schema: ${schemaName}`));

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    req.validatedBody = value;
    next();
  };
}

module.exports = { validate, schemas };
