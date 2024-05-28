import mongoose, { Mongoose } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || '1029384756000002858';

const userSchemaBD = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
}, {
  timestamps: true
});

class UserModel {
  static async register({ input }) {
    const user = new this(input);
    const newUser = await user.save();
    return {
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: jwt.sign({ id: newUser._id }, jwtSecret, {
        expiresIn: '1h'
      })
    };
  }

  static async login({ email, password }) {
    const user = await this.findOne({ email });
    if (!user || !(await user.comparsePassword(password))) {
      return null;
    }
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: '1h'
      })
    };
  }

  static async findByEmail(email) {
    return await this.findOne({ email });
  }

}

userSchemaBD.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchemaBD.methods.comparsePassword = function(pass) {
  return bcrypt.compare(pass, this.password);
}

userSchemaBD.loadClass(UserModel);

export const User = mongoose.model('User', userSchemaBD);