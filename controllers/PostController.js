const Post = require("../models/PostModel");
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      user: { $in: [...req.user.following, req.user.id] },
    })
      .populate("user")
      .sort({ createAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ msg: "Nous avons rencontrer une erreur" });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await new Post(req.body);
    newPost.user = req.user.id;
    newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ msg: "Nous avons rencontrer une erreur" });
  }
};
const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne(
      { _id: id, user: { $in: [...req.user.following, req.user.id] } }.populate(
        "user"
      )
    );
    res.json(post);
  } catch (error) {
    res.status(500).json({ msg: "Nous avons rencontrer une erreur" });
  }
};

const UpdatePost = async (req, res, next) => {
  const id = req.params.id;

  try {
    let post = await Post.findOneAndUpdate(id, req.body);
    if (!post || post.user != req.user.id) {
      const error = new Error("Wrong request");
      throw error;
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};
const deletePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findOneAndRemove({ _id: id });
    if (!post || post.user != req.user.id) {
      const error = new Error("Wrong request");
      throw error;
    }
    res.json({ msg: "Le post a bien été supprimé !" });
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllPosts, createPost, getPost, UpdatePost, deletePost };
