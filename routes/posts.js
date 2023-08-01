
const express = require("express");
const { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPost, commentPost } = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/search",getPostsBySearch);
router.get("/" , getPosts);
router.get("/:id",getPost);
router.post("/",auth,createPost);
router.patch("/:id",auth,updatePost);
router.delete("/:id",auth,deletePost);
router.patch("/:id/likePost",auth,likePost);
router.post("/:id/commentPost",auth,commentPost)

module.exports = router;