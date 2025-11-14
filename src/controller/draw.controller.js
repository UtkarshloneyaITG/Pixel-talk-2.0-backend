const drawController = async (socket, io, data) => {
  try {
    await socket.broadcast.emit("draw", data);
  } catch (error) {
    console.log(error);
  }
};

const startController = async (socket, io, data) => {
  try {
    await socket.broadcast.emit("start", data);
  } catch (error) {
    console.log(error);
  }
};

const clearController = async (socket, io) => {
  try {
    await socket.broadcast.emit("clear", true);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { drawController, startController, clearController };
