import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  projectId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('task', taskSchema);
