const Ping = require("./models/ping");

const ping = async () => {
  try {
    const hasPings = await Ping.count({});
    console.log({ hasPings });
    if (hasPings > 0) {
      const previousPing = await Ping.findAll({});
      const count = previousPing[0].count;
      previousPing[0].count = count + 1;
      console.log({ count: previousPing[0].count });
      await previousPing[0].save();
    } else {
      await Ping.create({ count: 1 });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { ping };
