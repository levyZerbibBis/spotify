const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  password: { type: String, required: true },
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};
userSchema.methods.comparePassword = async function (oldPassword) {
  return bcrypt.compare(oldPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
