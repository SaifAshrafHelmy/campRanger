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

let joiReviewSchema= Joi.object({
  body: Joi.string().required().escapeHTML(),
  rating:Joi.number().required().min(1).max(5)
  

})

module.exports = joiReviewSchema;