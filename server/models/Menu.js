import mongoose from 'mongoose';
const { Schema } = mongoose;

//create schema object for Menu items
const menuSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		minLength: 3,
	},
	recipe: String,
	image: String,
	category: String,
	price: Number,
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
