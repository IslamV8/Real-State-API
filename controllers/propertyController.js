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
    console.error("❌ Error creating property:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  console.log("🔥 API HIT: /api/properties");
  const start = Date.now();
  try {
    const properties = await Property.find().limit(5).lean(); // مؤقتًا بدون فلترة
    const end = Date.now();
    console.log(`✅ DONE in ${end - start}ms`);
    res.status(200).json(properties);
  } catch (err) {
    console.error("❌ Error fetching properties:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("createdBy", "username")
      .lean(); // ✅ تحسين الأداء

    if (!property) return res.status(404).json({ error: "Property not found" });

    const comments = await Comment.find({ property: req.params.id })
      .populate("user", "username")
      .lean();

    res.json({ property, comments });
  } catch (err) {
    console.error("❌ Error fetching property:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });

    // ✅ حماية: لازم يكون اللي حذفه هو نفسه اللي عمله
    if (property.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    console.error("❌ Error deleting property:", err);
    res.status(500).json({ error: err.message }); // 🛠️ أصلحت `err.messsge`
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });

    if (property.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (err) {
    console.error("❌ Error updating property:", err);
    res.status(500).json({ error: err.message });
  }
};
