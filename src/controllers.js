import mongoose from "mongoose";
import { Post } from "./post.model.js";


function invalidText(text) {
    return typeof text !== "string" || text.trim() === "";
}

const validateObjectId = (id) => mongoose.isValidObjectId(id);

// GET ALL POSTS |-----------------
export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error:", error.message)
    }
};


// GET A PARTICULAR POST |--------------
export async function getPost(req, res) {
    try {
        if (!validateObjectId(req.params.id)) {
            return res.status(404).json({ error: "Post not found" });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "No post found",
            })
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error:", error.message)
    }
}


// CREATE POST |-------------------------
export async function createPost(req, res) {
    try {
        if (invalidText(req.body.text)) {
            return res.status(400).json({
                error: "Text is required",
            });
        }

        const post = await Post.create({
            text: req.body.text,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error:", error.message);

    }
}


// UPDATE POST |--------------------------
export async function updatePost(req, res) {

    try {
        if (!validateObjectId(req.params.id)) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (invalidText(req.body.text)) {
            return res.status(400).json({
                error: "Text is required",
            });
        }

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            })
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error", error.message);
    }
}



export async function deletePost(req, res) {

    try {
        if (!validateObjectId(req.params.id)) {
            return res.status(404).json({ error: "Post not found" });
        }

        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            })
        }

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error:", error.message);
    }
}