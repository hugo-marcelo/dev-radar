const axios = require('axios');

const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      const sendSocketMessageTo = findConnections(
        {
          latitude,
          longitude,
        },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'newDev', dev);
    }

    return response.json(dev);
  },

  async update(request, response) {
    const { github_username } = request.params;

    const devExists = await Dev.findOne({ github_username });

    if (!devExists) {
      return response.status(400).json({ error: 'Dev not found' });
    }

    await devExists.update(request.body);

    return response.json(request.body);
  },

  async destroy(request, response) {
    const { github_username } = request.params;
    const dev = await Dev.findOne({ github_username });

    const [longitude, latitude] = dev.location.coordinates;

    if (!dev) {
      return response.status(400).json({ error: 'Dev not found' });
    }

    const sendSocketMessageTo = findConnections(
      {
        latitude,
        longitude,
      },
      dev.techs
    );

    sendMessage(sendSocketMessageTo, 'deletedDev', dev);

    await Dev.deleteOne({ github_username });
    return response.json({ ok: true });
  },
};
