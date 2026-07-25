const fs = require('fs');
const path = require('path');

const NUM_STORIES = 100;
const stories = [];

const regions = ['Hà Nội', 'Hải Phòng', 'Quảng Ninh', 'Nghệ An', 'Thanh Hóa', 'Hà Tĩnh', 'Đà Nẵng', 'Huế', 'Quảng Nam', 'Bình Định', 'Khánh Hòa', 'Gia Lai', 'TP.HCM', 'Bình Dương', 'Đồng Nai', 'Cần Thơ', 'Long An', 'Vũng Tàu'];
const jobs = ['Thợ hồ', 'Thợ sắt', 'Thợ sơn', 'Thợ điện', 'Thợ nước', 'Thợ mộc', 'Lái cẩu tháp', 'Đốc công', 'Thợ chống thấm', 'Thợ lợp mái'];
const stats = ['8.000 mẻ vữa', '12 km thép', '500 căn phòng', '10.000 giờ', '3.000 ổ cắm'];

// Generate an S-shape grid (approximately)
// Grid is 20 rows x 10 cols.
// Let's populate it.
const sShapePositions = [
  // Top curve (North)
  [1, 5], [1, 6], [1, 7],
  [2, 4], [2, 5], [2, 6], [2, 8],
  [3, 3], [3, 4], [3, 7], [3, 8], [3, 9],
  [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9],
  [5, 4], [5, 5], [5, 6], [5, 7], [5, 8],
  [6, 5], [6, 6], [6, 7],
  // Middle diag (Central)
  [7, 6], [7, 7], [7, 8],
  [8, 7], [8, 8], [8, 9],
  [9, 7], [9, 8], [9, 9],
  [10, 8], [10, 9],
  [11, 8], [11, 9],
  [12, 7], [12, 8], [12, 9],
  [13, 6], [13, 7], [13, 8],
  // Bottom curve (South)
  [14, 5], [14, 6], [14, 7],
  [15, 4], [15, 5], [15, 6],
  [16, 3], [16, 4], [16, 5], [16, 6],
  [17, 2], [17, 3], [17, 4], [17, 5],
  [18, 2], [18, 3], [18, 4],
  [19, 3], [19, 4], [19, 5],
  [20, 4], [20, 5]
]; // Approx 59 positions.

// To get 100 points, we need a denser grid. Let's make it 30x15 and generate 100 points.
// Actually, we can just procedurally generate 100 points in an S shape.
function getSShapePoints(numPoints) {
    const points = [];
    const rows = 30;
    const cols = 15;
    
    // We will loop through grid and assign if it falls in the S shape.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let inS = false;
            // North
            if (r >= 1 && r <= 8 && c >= 4 && c <= 10) inS = true;
            // Central
            if (r >= 9 && r <= 19 && c >= 7 && c <= 12) inS = true;
            // South
            if (r >= 20 && r <= 28 && c >= 2 && c <= 8) inS = true;
            
            // Cutout top left and bottom right to make it S
            if (r >= 5 && r <= 11 && c < 7) inS = false;
            if (r >= 17 && r <= 23 && c > 8) inS = false;

            if (inS) {
                points.push([r, c]);
            }
        }
    }
    
    // If points > 100, we randomly remove some.
    while (points.length > 100) {
        points.splice(Math.floor(Math.random() * points.length), 1);
    }
    // If points < 100, we just add random ones near the center.
    while (points.length < 100) {
        points.push([Math.floor(Math.random() * 20) + 5, Math.floor(Math.random() * 10) + 3]);
    }
    return points;
}

const points = getSShapePoints(NUM_STORIES);

for (let i = 0; i < NUM_STORIES; i++) {
  const stat = stats[Math.floor(Math.random() * stats.length)];
  const job = jobs[Math.floor(Math.random() * jobs.length)];
  const region = regions[Math.floor(Math.random() * regions.length)];
  
  stories.push({
    id: i + 1,
    image: `https://picsum.photos/800/800?random=${i}`,
    thumbnail: `https://picsum.photos/200/200?random=${i}`,
    story: `Đôi tay này đã gắn bó với nghề ${job.toLowerCase()}. Mỗi ngày trôi qua trên công trường ${region} là một ngày cống hiến. Bàn tay chai sạn vì nắng gió, nhưng vẫn miệt mài làm việc. 'Làm nghề này cực, nhưng nhìn công trình mọc lên lại thấy vui.'`,
    quote: "Làm nghề này cực, nhưng nhìn công trình mọc lên lại thấy vui.",
    job: job,
    region: region,
    stat: stat,
    grid_row: points[i][0],
    grid_col: points[i][1]
  });
}

const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'stories.json'), JSON.stringify(stories, null, 2));
console.log('Generated stories.json');
