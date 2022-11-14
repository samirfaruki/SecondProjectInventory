const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  C_name: { type: String, required: true, maxLength: 100 },
  //   C_discription: { type: String, maxLength: 240 },
  //   family_name: { type: String, required: true, maxLength: 100 },
});

// Virtual for author's URL
CategorySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
