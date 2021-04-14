const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  reps: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
});

mongoose.model("Exercise", exerciseSchema);
