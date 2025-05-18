const User = require("../models/User");

exports.toggleFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const propertyId = req.params.id;

        const index = user.favorites.indexOf(propertyId);
        if (index > -1){
            user.favorites.splice(index, 1); //remove from favorites
        } else {
            user.favorites.push(propertyId); // add favorites
        }
        

        await user.save();
        res.json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};