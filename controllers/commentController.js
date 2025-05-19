const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
    try { 
        const comment = new Comment({
            text: req.body.text,
            property: req.params.id,
            user: req.user.userId,
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


exports.deleteComment = async (req, res) =>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ error: "Comment not found" });

        if (comment.user.toString() !== req.user.userId)
            return res.status(403).json({ error: "Not authorized" });

        await Comment.findByIdAndDelete(req.params.commentId);
        res.json({ message: "comment deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};