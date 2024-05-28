import mongoose from "mongoose";

const taskSchemaDB = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  time: {
    type: String
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true
});

class TaskModel {
  static async getAll({ user }) {
    return this.find({ user });
  }

  static async getById({ id }) {
    return this.findById(id);
  }

  static async create({ input }) {
    const task = new this(input);
    return task.save();
  }

  static async update({ id, input }) {
    return this.findByIdAndUpdate(id, input, {
      new: true
    });
  }

  static async delete({ id }) {
    return this.findByIdAndDelete(id);
  }

}

taskSchemaDB.loadClass(TaskModel);

export const Task = mongoose.model('Task', taskSchemaDB);