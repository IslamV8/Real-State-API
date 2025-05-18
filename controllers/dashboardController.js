const User = require("../models/User");
const Property = require("../models/Property");
const Comment = require("../models/Comment");

exports.getDashboardData = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProperties = await Property.countDocuments();
        const totalComments = await Comment.countDocuments();

        const topCities = await Property.aggregate([
            {
                $group: {
                    _id: "$location",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]);

        const topExpensive = await Property.find()
            .sort({ price: -1 })
            .limit(5)
            .select("title price location");

        res.json({
            totalUsers,
            totalProperties,
            totalComments,
            topCities: topCities.map(city => ({
                city: city._id,
                count: city.count
            })),
            topExpensive
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
