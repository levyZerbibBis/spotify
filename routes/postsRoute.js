const {
  getAllPosts,
  createPost,
  getPost,
  UpdatePost,
  deletePost
} = require("../controllers/PostController");

const router = require("express").Router();

router.get("/all", getAllPosts);

router.post("/new", createPost);
router.route('/:id')
.get(getPost)
.put(UpdatePost)
.delete(deletePost)
module.exports = router;
