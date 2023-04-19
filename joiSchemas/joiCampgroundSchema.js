  const BaseJoi = require('joi')
  const sanitizeHtml = require('sanitize-html')

  const extension = (joi)=> ({
    type: 'string',
    base: joi.string(),
    messages: {
      'string.escapeHTML':'{{#label}} must not include HTML!'
    },
    rules: {
      escapeHTML: {
        validate(value,htelpers){
          const clean = sanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},

          });
          if(clean!==value) return htelpers.error('string.escapeHTML', {value})
          return clean;
        }
      }
    }
  })

  const Joi = BaseJoi.extend(extension)


  
  let joiCampgroundSchema= Joi.object({
    title:Joi.string().required().escapeHTML(),
    price:Joi.number().required().min(0),
    location:Joi.string().required().escapeHTML(),
    description:Joi.string().required().escapeHTML(),
    // image:Joi.string().required(),
      deleteImages: Joi.array()
  })





  module.exports = joiCampgroundSchema;