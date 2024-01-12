import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {type: String},
    userId: String,
    done: String
})

export const Post = mongoose.models.Post || mongoose.model('Post',postSchema)