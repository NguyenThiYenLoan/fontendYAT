const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Đường dẫn tới thư mục build
const buildDir = path.join(__dirname, 'build', 'static', 'js');

// Đọc tất cả các file JavaScript trong thư mục build
fs.readdirSync(buildDir).forEach(file => {
  const filePath = path.join(buildDir, file);

  // Đọc nội dung file
  const code = fs.readFileSync(filePath, 'utf-8');

  // Xáo trộn mã
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
  }).getObfuscatedCode();

  // Ghi lại file với mã đã được xáo trộn
  fs.writeFileSync(filePath, obfuscatedCode);
  console.log(`${file} đã được obfuscate.`);
});
