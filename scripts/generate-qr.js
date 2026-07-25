import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const DATA_PATH = path.join(__dirname, '../src/data/stories.json');
const OUTPUT_DIR = path.join(__dirname, '../public/qrcodes');
const BASE_URL = 'https://100bantay.vn';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateQRCodes() {
  try {
    // Read JSON data
    const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
    const stories = JSON.parse(rawData);
    
    // QR Generation Options
    const options = {
      errorCorrectionLevel: 'H',
      type: 'png',
      quality: 0.92,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 400 // Good size for printing 3x3cm
    };

    console.log(`Bắt đầu tạo ${stories.length + 1} mã QR Code...`);

    // 1. Generate Main QR Code (qr_000.png)
    const mainFilePath = path.join(OUTPUT_DIR, 'qr_000.png');
    await QRCode.toFile(mainFilePath, BASE_URL, options);
    console.log('✅ qr_000.png - Trang chủ');

    // 2. Generate Story QR Codes
    for (const story of stories) {
      const url = `${BASE_URL}/story/${story.id}`;
      // pad with leading zeros, e.g. 001, 042, 100
      const paddedId = String(story.id).padStart(3, '0');
      const filename = `qr_${paddedId}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);

      await QRCode.toFile(filepath, url, options);
      console.log(`✅ ${filename} - Câu chuyện #${story.id} (${story.job} tại ${story.region})`);
    }

    console.log('🎉 Hoàn tất! Tất cả QR Code đã được lưu tại folder: public/qrcodes/');
  } catch (error) {
    console.error('❌ Có lỗi xảy ra trong quá trình tạo mã QR:', error);
  }
}

generateQRCodes();
