if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}
import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(process.env.DATABASE_URL);
 
autoIncrement.initialize(connection);

const receiptSchema = new mongoose.Schema({
  vehicle: {
    type: ObjectId,
    ref: 'Vehicle',
    required: true
  },
  start_time: {
    type: Date,
  },
  end_time: {
    type: Date,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  lot: {
    type: ObjectId,
    ref: 'Lot',
    required: true
  },
  card: {
    type: ObjectId,
    ref: 'Card',
    required: true
  },
  price: {
    type: Currency,
    get: getPrice,
  }
});

function getPrice(num) {
  return (num/100).toFixed(2);
}

receiptSchema.plugin(autoIncrement.plugin, 'Receipt');
const Receipt = mongoose.model('Receipt', receiptSchema);

export default Receipt;
