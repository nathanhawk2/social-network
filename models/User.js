const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, require: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match:x }, //x is placeholder, figure out how to match
    friends: [{ type: Schema.Types.ObjectId, ref: 'Friends' }],
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thoughts' }],
  },
  {
    toJSON: { getters: true, virtuals: true }, id: false,
  },
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;