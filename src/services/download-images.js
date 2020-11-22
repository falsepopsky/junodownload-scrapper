const fetch = require('node-fetch');
const fs = require('fs');

async function allObjects(objectos) {
  try {
    objectos.forEach(async (objeto, index) => {
      await downloadImage(objeto);
    });
  } catch (error) {
    console.error(error);
  }
}

async function downloadImage(releaseObject) {
  const imagen = await fetch(releaseObject.urlImage);
  const nombreRelease = await releaseObject.urlImage.replace(
    'https://imagescdn.junodownload.com/300/',
    ''
  );

  const destino = fs.createWriteStream(`./src/images/releases/${nombreRelease}`);
  imagen.body.pipe(destino);
}

module.exports = { downloadImage, allObjects };
