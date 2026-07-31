const fs = require('fs');
const path = require('path');

const storiesPath = path.join(__dirname, 'src', 'data', 'stories.json');
const imagesDir = path.join(__dirname, 'public', 'images', 'hands');

// Get all files in images dir
const files = fs.readdirSync(imagesDir);
const extensionMap = {};

files.forEach(file => {
  const match = file.match(/^(\d+)\.(.+)$/);
  if (match) {
    const id = match[1];
    const ext = match[2];
    extensionMap[id] = ext;
  }
});

const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));

stories.forEach(story => {
  const match = story.image.match(/\/images\/hands\/(\d+)\.jpg/);
  if (match) {
    const originalId = match[1];
    if (extensionMap[originalId]) {
      story.image = `/images/hands/${originalId}.${extensionMap[originalId]}`;
    }
  }
});

fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 2), 'utf8');
console.log('Updated image extensions in stories.json');
