const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thought: { type: String, required: true, min_length: 1, max_length: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactionSchema]
  },
    {
    toJSON: { getters: true, virtuals: true },
    id: false,
  },
);

userSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const thought = model('Thought', thoughtSchema);

module.exports = thought;