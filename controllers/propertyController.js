const Property = require("../models/Property");
const Comment = require("../models/Comment");


exports.createProperty = async (req, res) => {
    console.log("🔥 Token payload:", req.user);
  try {
        const imageUrls = req.files.map(file => file.path);
        const property = new Property({
            ...req.body,
            images: imageUrls,
            createdBy: req.user.userId,
        });
        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllProperties = async (req, res) => {
  console.log("📥 [START] GET /api/properties");

  const start = Date.now();
  const { city, type, minPrice, maxPrice, keyword, page = 1, limit = 10 } = req.query;
  let filter = {};

  if (city) filter.location = city;
  if (type) filter.type = type;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
  }
  if (keyword) {
    filter.title = { $regex: keyword, $options: "i" };
  }

  try {
    const properties = await Property.find(filter)
      // .populate("createdBy", "username") ← شيلها مؤقتًا لو مش مهمة
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean(); // ✅ أسرع بكتير في serverless

    const end = Date.now();
    console.log(`✅ [DONE] GET /api/properties in ${end - start}ms`);

    res.json(properties);
  } catch (err) {
    console.error("❌ Error in getAllProperties:", err);
    res.status(500).json({ error: err.message });
  }
};



exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("createdBy", "username");
    if (!property) return res.status(404).json({ error: "Property not found" });

    const comments = await Comment.find({ property: req.params.id }).populate("user", "username");

    res.json({ property, comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(403).json({ error: "Not authorized" });

        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: "Property deleted" });
    } catch (err) {
        res.status(500).json({ error: err.messsge})
    }
};


exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: "Property not found" });

        if (property.createdBy.toString() !== req.user.userId)
            return res.status(403).json({ error: "Not authorized" });
    


    Object.assign(property, req.body);
    await property.save();
    res.json(property);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};