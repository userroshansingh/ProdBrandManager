import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
});

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
