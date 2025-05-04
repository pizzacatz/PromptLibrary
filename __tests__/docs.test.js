const fs = require('fs');
const path = require('path');

// Mock test to verify README includes required sections
test('README should include setup, build, and deploy instructions', () => {
  // This is a stub test that would:
  // 1. Read the README.md file
  // 2. Check for required sections
  
  const readmePath = path.join(__dirname, '../README.md');
  
  expect(fs.existsSync(readmePath)).toBeTruthy();
  
  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // Check for required sections
  expect(readmeContent).toContain('## Setup');
  expect(readmeContent).toContain('## Build');
  expect(readmeContent).toContain('## Deployment');
  
  // Check for specific instructions
  expect(readmeContent).toContain('npm run build');
  expect(readmeContent).toContain('frontend/');
  expect(readmeContent).toContain('backend/');
}); 