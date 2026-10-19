import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "text is required"],
        trim: true,
        maxlength: [500, "text must be 500 characters or less"],
    },
},
    { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);