const mongoose = require("mongoose");
const User = require("../models/User");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property "}]
}, {timestamps: true });


exports.toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const propertyId = req.params.id;

    const index = user.favorites.indexOf(propertyId);
    if (index > -1) {
      user.favorites.splice(index, 1); // remove
    } else {
      user.favorites.push(propertyId); // add
    }

    await user.save();
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = mongoose.model("User", userSchema);