const { register, login, me } = require("../controllers/userController");
const passportJWT = require("../middlewares/passportJWT")();

const userRouter = require("express").Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/me", passportJWT.authenticate(), me)

module.exports = userRouter;
