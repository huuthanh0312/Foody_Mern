import mongoose from 'mongoose';
const { Schema } = mongoose;

//create schema object for Menu items
const userSchema = new Schema({
	name: String,
	email: {
		type: String,
		trim: true,
		required: true,
		minLength: 10,
	},
	photoURL: String,
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
});

const User = mongoose.model('User', userSchema);

export default User;
