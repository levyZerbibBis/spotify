const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const router = require("./routes/postsRoute");
const userRouter = require("./routes/UsersRoute");
const followRouter = require("./routes/followingRoute");
const passportJWT = require('./middlewares/passportJWT')()

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/f2i-insta-flex");
  console.log(`📚[Database] is connected to MongoDB`);
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passportJWT.initialize())
app.get("/", (req, res) => {
  console.log("🐲");pm
});

app.use("/api/posts",passportJWT.authenticate(), router);
app.use("/api/follow",passportJWT.authenticate(), followRouter);
app.use("/api/users", userRouter);
app.listen(port, () => console.log(` ⚡️ [SERVER] is running on : ${port}`));
