import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {type: String},
    userId: String,
    done: String
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String
})

export const Post = mongoose.models.Post || mongoose.model('Post',postSchema)
export const User = mongoose.models.User || mongoose.model('User',userSchema)