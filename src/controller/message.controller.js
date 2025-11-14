const MSG_ = require("../model/chat.model");

const messageController = async (socket, io, msg) => {
  try {
    let imageDataUrl = null;
    if (msg.image) {
      const mimeType = msg.imageType || "image/png"; // store type in msg.imageType
      imageDataUrl = `data:${mimeType};base64,${Buffer.from(msg.image).toString(
        "base64"
      )}`;
    }

    const newMsg = new MSG_({
      msg: msg.msg,
      userID: msg.userID,
      image: imageDataUrl,
    });
    const count = await MSG_.countDocuments();

    // If more than 100, delete the oldest
    if (count > 100) {
      await MSG_.findOneAndDelete({}, { sort: { createdAt: 1 } });
    }

    await newMsg.save();

    io.emit("chat-message", newMsg); // broadcast to all connected clients
  } catch (error) {
    console.error("Error in messageController:", error);
  }
};

const deleteMessage = async (socket, io, ID) => {
  try {
    const deleteMSG = await MSG_.findOneAndDelete({ _id: ID });
    io.emit("delete-message", ID);
    console.log("id=>>>>>", ID);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { messageController, deleteMessage };
