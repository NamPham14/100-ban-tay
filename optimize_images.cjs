const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'images', 'hands');
const outputDir = path.join(__dirname, 'public', 'images', 'hands', 'thumbs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => !fs.statSync(path.join(inputDir, f)).isDirectory());

async function processImages() {
  console.log(`Bắt đầu nén ${files.length} ảnh...`);
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    
    // Tên file cho thumbnail luôn là .webp
    const thumbName = file.replace(/\.[^.]+$/, '.webp');
    const outputPath = path.join(outputDir, thumbName);
    
    try {
      // Resize to 128x128 for the grid (it's 32x32 CSS, 128 is crisp for retina)
      await sharp(inputPath)
        .resize(128, 128, { fit: 'cover' })
        .webp({ quality: 70 })
        .toFile(outputPath);
      // console.log(`Optimized: ${file} -> ${thumbName}`);
    } catch (e) {
      console.error(`Lỗi ảnh ${file}:`, e.message);
    }
  }
  console.log("Đã nén xong toàn bộ ảnh!");
  
  // Cập nhật lại stories.json
  const storiesPath = path.join(__dirname, 'src', 'data', 'stories.json');
  const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));
  
  stories.forEach(story => {
    // story.image: /images/hands/1.JPG
    const match = story.image.match(/\/images\/hands\/(.+)$/);
    if (match) {
      const filename = match[1];
      const thumbName = filename.replace(/\.[^.]+$/, '.webp');
      story.thumbnail = `/images/hands/thumbs/${thumbName}`;
    }
  });
  
  fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 2), 'utf8');
  console.log('Đã cập nhật trường thumbnail vào stories.json');
}

processImages();
