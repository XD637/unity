import mongoose from 'mongoose';

const unitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ClassName: { type: String, required: true },
  duration: { type: String, required: true },
  Place: { type: String, required: true },
  Teachername: { type: String, required: true }
}, { collection: 'unity' });

export default mongoose.model('Unity', unitySchema);
