const User = require("../models/userModel");
const jwt = require("jwt-simple");
const config = require("../config")


const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.hashPassword();
    await newUser.save();
    res.json({ msg: "Inscription Done !!!", newUser });
  } catch (error) {
    res.status(500).json({ msg: "Erreur lors de l'inscription" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(401).json({message:"Nom d'utilisateur incorrect."})
    }
    const passwordMatch = await user.comparePassword(password)
    if(!passwordMatch){
      return  res.status(401).json({message:"Mot de passe incorrecte."})
    }
    const token = jwt.encode({ id: user.id}, config.jwtSecret)
    res.json({user, token})
  } catch (error) {
    res.status(500).json({msg:"Erreur lors de la connexion"})
  }
};
const me = async(req, res, next)=>{
  try {
    const user = await User.findOne(req.user)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, me };
