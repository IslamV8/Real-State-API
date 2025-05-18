const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property"},
    user: { type: mongoose.Schema.Types.ObjectId, ref : "User"},
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);