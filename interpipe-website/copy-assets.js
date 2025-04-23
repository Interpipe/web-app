// Copy assets to public folder script
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Source directory
const sourceDir = path.resolve(__dirname, 'src/assets/Home/hero_slides');
// Destination directory
const destDir = path.resolve(__dirname, 'public/assets/hero_slides');

// Ensure destination directory exists
ensureDirectoryExists(destDir);

// Copy files
try {
  const files = fs.readdirSync(sourceDir);
  
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    // Only copy files, not directories
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${sourcePath} -> ${destPath}`);
    }
  }
  
  console.log('All hero slide images copied successfully!');
} catch (error) {
  console.error('Error copying files:', error);
  process.exit(1);
} 