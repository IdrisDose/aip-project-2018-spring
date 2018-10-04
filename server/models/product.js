const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: Array,
    required: true,
  },
  description: {
    type: 'string',
  },
});

// eslint-disable-next-line no-undef
module.exports.default = Product = mongoose.model('product', productSchema);
