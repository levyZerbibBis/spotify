const follow = require("../controllers/followController");

const followRouter = require("express").Router();

followRouter.post("/:id", follow);

module.exports = followRouter;
