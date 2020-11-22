const fs = require('fs');

async function writeJsonFile(objectReleases) {
  try {
    const data = JSON.stringify(objectReleases);
    const todayDate = Date.now() + 1;
    await fs.writeFileSync(`./src/data/${todayDate}.json`, data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { writeJsonFile };
