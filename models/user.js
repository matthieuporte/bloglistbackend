const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: [true, "an username is required"]
	},
	name: String,
	passwordHash: String,
	blogPosts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog"
		}
	],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash;
	}
});

module.exports = mongoose.model("User", userSchema);