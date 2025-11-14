const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
    },
    userID: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

const MSG_ = mongoose.model("messages", messageSchema);

module.exports = MSG_;
