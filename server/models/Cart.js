import mongoose from 'mongoose';
const { Schema } = mongoose;

//create schema object for Menu items
const cartSchema = new Schema({
  menuItemId: String,
	name: {
		type: String,
		trim: true,
		required: true,
		minLength: 3,
	},
	recipe: String,
	image: String,
	price: Number,
  quantity: Number,
  email:{
    type: String,
    true: true,
    required: true,
  }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;