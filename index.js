import express from 'express';
import mongoose from 'mongoose';
import Unity from './unity.model.js';
import Counter from './counter.model.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create
app.post('/unity', async (req, res) => {
  try {
    // Auto-increment id
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'unity' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const unity = new Unity({ ...req.body, id: counter.seq.toString() });
    await unity.save();
    console.log('Created:', unity);
    res.status(201).json(unity);
  } catch (err) {
    console.error('Create error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get all
app.get('/unity', async (req, res) => {
  try {
    const unities = await Unity.find();
    console.log('Fetched all:', unities.length, 'records');
    res.json(unities);
  } catch (err) {
    console.error('Get all error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete by ClassName
app.delete('/unity/:ClassName', async (req, res) => {
  try {
    const unity = await Unity.findOneAndDelete({ ClassName: req.params.ClassName });
    if (!unity) {
      console.warn('Delete by ClassName not found:', req.params.ClassName);
      return res.status(404).json({ error: 'Not found' });
    }
    console.log('Deleted by ClassName:', unity);
    res.json({ message: 'Deleted by ClassName' });
  } catch (err) {
    console.error('Delete by ClassName error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
