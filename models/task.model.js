const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [5, "Title must be at least 5 character long"],
    maxlength: [30, "Title must be less 30 character long"],
  },
  description: { type: String },
  completed: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "User-id is required"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Tasks = mongoose.model("Tasks", schema);

module.exports = Tasks;
