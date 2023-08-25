const { Schema, model } = require("mongoose"); // Corrigé la déstructuration de mongoose.
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  password: { type: String, required: true },
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Middleware pour hasher le mot de passe avant de sauvegarder
userSchema.pre('save', async function(next) {
  // Si le mot de passe n'a pas été modifié, passe au middleware suivant
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const User = model("User", userSchema);

module.exports = User;
