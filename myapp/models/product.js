const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  src: String,
  P_name: { type: String, required: true, maxLength: 100 },
  P_discription: { type: String, maxLength: 240 },
  //   family_name: { type: String, required: true, maxLength: 100 },

  P_price: { type: Number, required: true, maxLength: 6 },
  P_quantity: { type: Number, required: true, maxLength: 6 },
  P_category: { type: Schema.Types.ObjectId, ref: "Category" },
  //   manufacture_date: { type: Date },
  //   expiry_date: { type: Date },
});

module.exports = mongoose.model("Product", ProductSchema);

// Virtual for author's full name
// ProductSchema.virtual("name").get(function () {
//   // To avoid errors in cases where an author does not have either a family name or first name
//   // We want to make sure we handle the exception by returning an empty string for that case
//   let fullname = "";
//   if (this.first_name && this.family_name) {
//     fullname = `${this.family_name}, ${this.first_name}`;
//   }
//   if (!this.first_name || !this.family_name) {
//     fullname = "";
//   }
//   return fullname;
// });

// Virtual for author's URL
// ProductSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/catalog/author/${this._id}`;
// });

// Export model
