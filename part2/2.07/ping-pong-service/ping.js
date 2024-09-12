const Ping = require("./models/ping");

const ping = async () => {
  try {
    const hasPings = await Ping.count({});
    if (hasPings > 0) {
      const previousPing = await Ping.findAll({});
      const count = previousPing.count + 1;
      await Ping.create({ count: count });
    } else {
      await Ping.create({ count: 1 });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { ping };
