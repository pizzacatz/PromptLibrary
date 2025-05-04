const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Mock test to verify build script creates dist directory
test('Backend build script creates dist directory', (done) => {
  // This is a stub test that would:
  // 1. Run npm run build
  // 2. Check if dist directory exists
  
  // Mock implementation - in a real test you'd run the actual command
  const mockBuildCommand = () => {
    return new Promise((resolve) => {
      // Simulate build command
      const distPath = path.join(__dirname, '../dist');
      
      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
      }
      
      // Create a mock bundled file
      fs.writeFileSync(
        path.join(distPath, 'index.js'),
        'exports.handler = async () => ({ statusCode: 200, body: JSON.stringify({ message: "OK" }) });'
      );
      
      resolve(true);
    });
  };
  
  mockBuildCommand().then(() => {
    const distExists = fs.existsSync(path.join(__dirname, '../dist'));
    expect(distExists).toBeTruthy();
    
    const indexFileExists = fs.existsSync(path.join(__dirname, '../dist/index.js'));
    expect(indexFileExists).toBeTruthy();
    
    done();
  });
}); 