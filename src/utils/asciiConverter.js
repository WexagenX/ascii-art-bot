const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const { createCanvas } = require('canvas');

const DEFAULT_ASCII_CHARS = '@%#*+=-:. ';

// Преобразует изображение в ASCII-арт (текст)

async function imageToAscii(imagePath, maxWidth = 60, charset = DEFAULT_ASCII_CHARS) {
  const safeWidth = Math.min(maxWidth, 70);
  const image = await Jimp.read(imagePath);
  image.resize(safeWidth, Jimp.AUTO).greyscale();

  let ascii = '';
  const { width, height } = image.bitmap;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      const brightness = (pixel.r + pixel.g + pixel.b) / 3;
      const index = Math.floor((brightness / 255) * (charset.length - 1));
      ascii += charset[index];
    }
    ascii += '\n';
  }

  return ascii;
}

// Преобразует ASCII-строку в картинку (JPG)
 
async function asciiToImage(ascii, outputPath) {
  const lines = ascii.split('\n').filter(line => line.trim() !== '');
  const fontSize = 10;
  const width = lines[0]?.length * fontSize * 0.6 || 200;
  const height = lines.length * fontSize * 1.2;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'white';
  ctx.font = `${fontSize}px monospace`;

  lines.forEach((line, i) => {
    ctx.fillText(line, 5, (i + 1) * fontSize);
  });

  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);

  return outputPath;
}

module.exports = {imageToAscii, asciiToImage,};
  
