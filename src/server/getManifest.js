const fs = require('fs');

const getManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
  } catch (error) {
    console.error(error);
  }
};

module.exports = getManifest;
