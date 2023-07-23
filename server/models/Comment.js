import mongoose from "mongoose";

const commentSchema= new mongoose.Schema(
    {
        text : {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

export default commentSchema;