// controllers/propertyController.js

const Property = require("../models/Property");
const Comment  = require("../models/Comment");

/**
 * GET /api/properties
 * Fetch all properties (limited to 1 for testing)
 */
exports.getAllProperties = async (req, res) => {
  console.log("🔹 [propertyController] getAllProperties - start");
  try {
    const properties = await Property.find()
      .limit(1)
      .lean();
    console.log(
      "🔹 [propertyController] getAllProperties - found",
      properties.length
    );
    return res.status(200).json(properties);
  } catch (err) {
    console.error(
      "🔹 [propertyController] getAllProperties - ERROR:",
      err.message
    );
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/properties
 * Create a new property (requires auth + file upload)
 */
exports.createProperty = async (req, res) => {
  console.log(
    "🔹 [propertyController] createProperty - start, user:",
    req.user
  );
  try {
    const imageUrls = (req.files || []).map((file) => file.path);
    const property = new Property({
      ...req.body,
      images: imageUrls,
      createdBy: req.user.userId,
    });

    await property.save();
    console.log(
      "🔹 [propertyController] createProperty - saved, id:",
      property._id
    );
    return res.status(201).json(property);
  } catch (err) {
    console.error(
      "🔹 [propertyController] createProperty - ERROR:",
      err.message
    );
    return res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/properties/:id
 * Fetch a single property along with its comments
 */
exports.getProperty = async (req, res) => {
  console.log(
    "🔹 [propertyController] getProperty - start, id:",
    req.params.id
  );
  try {
    const property = await Property.findById(req.params.id)
      .populate("createdBy", "username")
      .lean();
    if (!property) {
      console.log(
        "🔹 [propertyController] getProperty - not found, id:",
        req.params.id
      );
      return res.status(404).json({ error: "Property not found" });
    }

    const comments = await Comment.find({ property: req.params.id })
      .populate("user", "username")
      .lean();
    console.log(
      "🔹 [propertyController] getProperty - comments count:",
      comments.length
    );

    return res.status(200).json({ property, comments });
  } catch (err) {
    console.error(
      "🔹 [propertyController] getProperty - ERROR:",
      err.message
    );
    return res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/properties/:id
 * Update an existing property (must be owner)
 */
exports.updateProperty = async (req, res) => {
  console.log(
    "🔹 [propertyController] updateProperty - start, id:",
    req.params.id
  );
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      console.log(
        "🔹 [propertyController] updateProperty - not found, id:",
        req.params.id
      );
      return res.status(404).json({ error: "Property not found" });
    }

    if (property.createdBy.toString() !== req.user.userId) {
      console.log(
        "🔹 [propertyController] updateProperty - forbidden, user:",
        req.user.userId
      );
      return res.status(403).json({ error: "Not authorized" });
    }

    Object.assign(property, req.body);
    await property.save();
    console.log(
      "🔹 [propertyController] updateProperty - saved, id:",
      property._id
    );
    return res.status(200).json(property);
  } catch (err) {
    console.error(
      "🔹 [propertyController] updateProperty - ERROR:",
      err.message
    );
    return res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/properties/:id
 * Delete a property (must be owner)
 */
exports.deleteProperty = async (req, res) => {
  console.log(
    "🔹 [propertyController] deleteProperty - start, id:",
    req.params.id
  );
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      console.log(
        "🔹 [propertyController] deleteProperty - not found, id:",
        req.params.id
      );
      return res.status(404).json({ error: "Property not found" });
    }

    if (property.createdBy.toString() !== req.user.userId) {
      console.log(
        "🔹 [propertyController] deleteProperty - forbidden, user:",
        req.user.userId
      );
      return res.status(403).json({ error: "Not authorized" });
    }

    await Property.findByIdAndDelete(req.params.id);
    console.log(
      "🔹 [propertyController] deleteProperty - deleted, id:",
      req.params.id
    );
    return res.status(200).json({ message: "Property deleted" });
  } catch (err) {
    console.error(
      "🔹 [propertyController] deleteProperty - ERROR:",
      err.message
    );
    return res.status(500).json({ error: err.message });
  }
};
