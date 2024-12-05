import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }, // Link to brand
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
