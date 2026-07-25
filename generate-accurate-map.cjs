const fs = require('fs');
const path = require('path');

const exact100VietnamCoords = [
  // North (30 points)
  [2, 7], [2, 8],
  [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
  [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
  [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9],
  [6, 5], [6, 6], [6, 7], [6, 8], [6, 9],
  [7, 6], [7, 7], [7, 8],
  [8, 7], [8, 8],
  [9, 8],
  
  // Central (34 points)
  [10, 8], [10, 9],
  [11, 8], [11, 9], [11, 10],
  [12, 9], [12, 10], [12, 11],
  [13, 9], [13, 10], [13, 11],
  [14, 9], [14, 10], [14, 11],
  [15, 10], [15, 11], [15, 12],
  [16, 11], [16, 12],
  [17, 11], [17, 12], [17, 13],
  [18, 12], [18, 13],
  [19, 12], [19, 13], [19, 14],
  [20, 12], [20, 13],
  [21, 11], [21, 12], [21, 13],
  [22, 11], [22, 12],
  
  // South (30 points) - Added [31, 6] to make exactly 30 here and 100 total
  [23, 10], [23, 11], [23, 12],
  [24, 9], [24, 10], [24, 11], [24, 12],
  [25, 8], [25, 9], [25, 10], [25, 11],
  [26, 7], [26, 8], [26, 9], [26, 10],
  [27, 6], [27, 7], [27, 8], [27, 9],
  [28, 5], [28, 6], [28, 7], [28, 8],
  [29, 5], [29, 6], [29, 7],
  [30, 5], [30, 6], [31, 5], [31, 6],
  
  // Islands (6 points)
  [13, 15], [14, 16], // Hoang Sa
  [23, 16], [24, 17], [25, 16], [26, 17] // Truong Sa
];

console.log(`Total exact points: ${exact100VietnamCoords.length}`); // Should be 100

const NUM_STORIES = 100;
const stories = [];

const regions = ['Hà Nội', 'Hải Phòng', 'Quảng Ninh', 'Nghệ An', 'Thanh Hóa', 'Hà Tĩnh', 'Đà Nẵng', 'Huế', 'Quảng Nam', 'Bình Định', 'Khánh Hòa', 'Gia Lai', 'TP.HCM', 'Bình Dương', 'Đồng Nai', 'Cần Thơ', 'Long An', 'Vũng Tàu', 'Hoàng Sa', 'Trường Sa'];
const jobs = ['Thợ hồ', 'Thợ sắt', 'Thợ sơn', 'Thợ điện', 'Thợ nước', 'Thợ mộc', 'Lái cẩu tháp', 'Đốc công', 'Thợ chống thấm', 'Thợ lợp mái'];
const stats = ['8.000 mẻ vữa', '12 km thép', '500 căn phòng', '10.000 giờ', '3.000 ổ cắm', '5 tấn xi măng', '20 năm kinh nghiệm'];

for (let i = 0; i < NUM_STORIES; i++) {
  const stat = stats[Math.floor(Math.random() * stats.length)];
  const job = jobs[Math.floor(Math.random() * jobs.length)];
  
  // Assign regions logically based on coordinates
  let region = regions[0];
  const [r, c] = exact100VietnamCoords[i];
  if (r <= 9) region = 'Miền Bắc';
  else if (r > 9 && r <= 22) region = 'Miền Trung';
  else region = 'Miền Nam';
  
  // Islands
  if (r === 13 && c >= 15) region = 'Hoàng Sa';
  if (r >= 23 && c >= 16) region = 'Trường Sa';
  
  stories.push({
    id: i + 1,
    image: `https://picsum.photos/800/800?random=${i}`,
    thumbnail: `https://picsum.photos/200/200?random=${i}`,
    story: `Đôi tay này đã gắn bó với nghề ${job.toLowerCase()}. Mỗi ngày trôi qua trên công trường ${region} là một ngày cống hiến. Bàn tay chai sạn vì nắng gió, nhưng vẫn miệt mài làm việc. 'Làm nghề này cực, nhưng nhìn công trình mọc lên lại thấy vui.'`,
    quote: "Nặng nhất không phải sắt thép, là nỗi nhớ nhà.",
    job: job,
    region: region,
    stat: stat,
    grid_row: r,
    grid_col: c
  });
}

const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'stories.json'), JSON.stringify(stories, null, 2));
console.log('Generated accurate stories.json');
