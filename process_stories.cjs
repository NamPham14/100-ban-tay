const fs = require('fs');

const rawText = fs.readFileSync('raw_stories.txt', 'utf8');
const storiesJson = require('./src/data/stories.json');

// Parse raw text
const storyBlocks = rawText.split(/câu chuyện (\d+)/i).slice(1);
const parsedStories = [];

for (let i = 0; i < storyBlocks.length; i += 2) {
  const originalId = parseInt(storyBlocks[i].trim(), 10);
  let text = storyBlocks[i + 1].trim();
  
  if (!text) continue;

  // Extract title and story
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  let title = "CHƯA CÓ TIÊU ĐỀ";
  let story = "";

  // Title is usually the first all-caps line or the first line
  const titleIndex = lines.findIndex(l => l === l.toUpperCase() && l.length > 5);
  
  if (titleIndex !== -1) {
    title = lines[titleIndex];
    story = lines.slice(titleIndex + 1).join('\n\n');
  } else {
    title = lines[0];
    story = lines.slice(1).join('\n\n');
  }

  // Determine region
  const keywords = {
    north: ['hà nội', 'hải phòng', 'bắc ninh', 'phủ lý', 'hưng yên', 'hòa lạc', 'tam đảo', 'đình vũ', 'thái nguyên', 'quảng ninh', 'đồng mô', 'đông anh', 'miền bắc'],
    central: ['thanh hóa', 'nghệ an', 'hà tĩnh', 'quảng bình', 'quảng trị', 'huế', 'đà nẵng', 'quảng nam', 'quảng ngãi', 'bình định', 'phú yên', 'khánh hòa', 'nha trang', 'ninh thuận', 'bình thuận', 'phan thiết', 'tây nguyên', 'đà lạt', 'đắk lắk', 'gia lai', 'kon tum', 'miền trung'],
    south: ['hồ chí minh', 'sài gòn', 'bình dương', 'đồng nai', 'biên hòa', 'bà rịa', 'vũng tàu', 'tây nam bộ', 'cần thơ', 'cà mau', 'hậu giang', 'long an', 'tiền giang', 'bến tre', 'trà vinh', 'sóc trăng', 'bạc liêu', 'an giang', 'đồng tháp', 'vĩnh long', 'miền nam', 'miền tây'],
    islands: ['kiên giang', 'hoàng sa', 'trường sa', 'hải đảo', 'đảo']
  };

  const textLower = (title + ' ' + story).toLowerCase();
  let region = 'unknown';

  for (const [r, kwList] of Object.entries(keywords)) {
    if (kwList.some(kw => textLower.includes(kw))) {
      region = r;
      break;
    }
  }

  parsedStories.push({
    originalId,
    title,
    story,
    region,
    image: `/images/hands/${originalId}.jpg`
  });
}

console.log(`Parsed ${parsedStories.length} stories from raw text.`);

// Buckets
const buckets = {
  north: [],
  central: [],
  south: [],
  islands: [],
  unknown: []
};

parsedStories.forEach(s => {
  buckets[s.region].push(s);
});

console.log(`Initial buckets - North: ${buckets.north.length}, Central: ${buckets.central.length}, South: ${buckets.south.length}, Islands: ${buckets.islands.length}, Unknown: ${buckets.unknown.length}`);

// Slots needed
const limits = {
  north: 36, // IDs 1-36
  central: 30, // IDs 37-66
  south: 29, // IDs 67-94
  islands: 5 // IDs 95-100
};

// Distribute unknowns
for (const r of ['north', 'central', 'south', 'islands']) {
  while (buckets[r].length < limits[r] && buckets.unknown.length > 0) {
    buckets[r].push(buckets.unknown.shift());
  }
}

// If some buckets are over limit, move overflow to buckets under limit
const regions = ['north', 'central', 'south', 'islands'];
for (const r of regions) {
  while (buckets[r].length > limits[r]) {
    const s = buckets[r].pop();
    // Find bucket with space
    const targetRegion = regions.find(target => buckets[target].length < limits[target]) || 'north';
    buckets[targetRegion].push(s);
  }
}

// We might still have empty slots if total stories < 100.
// Fill them with placeholders.
let nextPlaceholderId = 1000;
for (const r of regions) {
  while (buckets[r].length < limits[r]) {
    buckets[r].push({
      originalId: nextPlaceholderId++,
      title: "ĐANG CẬP NHẬT CÂU CHUYỆN",
      story: "Câu chuyện ở vị trí này đang được ban tổ chức cập nhật.",
      region: r,
      image: `/images/hands/placeholder.jpg`
    });
  }
}

console.log(`Final buckets - North: ${buckets.north.length}, Central: ${buckets.central.length}, South: ${buckets.south.length}, Islands: ${buckets.islands.length}`);

// Map buckets to storiesJson
let storyIndex = 0;
const finalStories = [];

for (const r of regions) {
  for (const s of buckets[r]) {
    const existingSlot = storiesJson[storyIndex];
    
    // We keep ID and grid coordinates from existingSlot
    // We update content from our mapped story (s)
    finalStories.push({
      id: existingSlot.id,
      title: s.title,
      author: "Người lao động",
      role: "Thợ xây dựng Việt Nam",
      image: s.image,
      region: existingSlot.region, // Keep original string like "Miền Bắc"
      story: s.story,
      grid_row: existingSlot.grid_row,
      grid_col: existingSlot.grid_col
    });
    
    storyIndex++;
  }
}

fs.writeFileSync('./src/data/stories.json', JSON.stringify(finalStories, null, 2), 'utf8');
console.log('Successfully updated src/data/stories.json');
