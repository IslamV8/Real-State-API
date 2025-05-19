const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title : { type: String, required: true},
    description: String,
    price: {type: String, required: true},
    location: { type: String, required: true },
    type: {type: String, enum: ["rent", "sale"], required: true},
    bedrooms: Number,
    bathrooms: Number,
    images: [String],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:"User"}
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);